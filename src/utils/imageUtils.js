/**
 * Utility functions for handling image format conversion between URLs and base64
 */

/**
 * Check if a string is a base64 encoded image
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is base64 encoded image
 */
export const isBase64Image = (str) => {
	if (!str || typeof str !== 'string') return false;

	// Check for data URL format: data:image/[type];base64,[data]
	const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|bmp|webp);base64,/i;
	return base64Pattern.test(str);
};

/**
 * Check if a string is a URL (http/https)
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a URL
 */
export const isUrl = (str) => {
	if (!str || typeof str !== 'string') return false;

	try {
		const url = new URL(str);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};

/**
 * Convert image URL to base64
 * @param {string} url - The image URL
 * @returns {Promise<string>} - Promise that resolves to base64 string
 */
export const urlToBase64 = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch image: ${response.status}`);
		}

		const blob = await response.blob();

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error('Error converting URL to base64:', error);
		throw new Error(`Failed to convert URL to base64: ${error.message}`);
	}
};

/**
 * Convert File object to base64
 * @param {File} file - The File object
 * @returns {Promise<string>} - Promise that resolves to base64 string
 */
export const fileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		if (!file || !(file instanceof File)) {
			reject(new Error('Invalid file object'));
			return;
		}

		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

/**
 * Convert an array of mixed image data (URLs and base64) to all base64
 * @param {Array} images - Array of image data (URLs or base64 strings)
 * @returns {Promise<Array>} - Promise that resolves to array of base64 strings
 */
export const convertImagesToBase64 = async (images) => {
	if (!Array.isArray(images)) return [];

	const conversions = images.map(async (image) => {
		if (!image) return null;

		// If already base64, return as is
		if (isBase64Image(image)) {
			return image;
		}

		// If it's a URL, convert to base64
		if (isUrl(image)) {
			try {
				return await urlToBase64(image);
			} catch (error) {
				console.warn('Failed to convert URL to base64:', image, error);
				return null; // Return null for failed conversions
			}
		}

		// If it's neither base64 nor URL, return null
		console.warn('Unknown image format:', image);
		return null;
	});

	const results = await Promise.all(conversions);

	// Filter out null values (failed conversions)
	return results.filter((result) => result !== null);
};

/**
 * Process booking data to ensure all images are in base64 format
 * @param {Object} bookingData - The booking data object
 * @returns {Promise<Object>} - Promise that resolves to processed booking data
 */
export const processBookingImagesForApi = async (bookingData) => {
	if (!bookingData) return bookingData;

	const processedData = { ...bookingData };

	try {
		// Process attachments array
		if (Array.isArray(processedData.attachments)) {
			processedData.attachments = await convertImagesToBase64(
				processedData.attachments
			);
		}

		// Process image_itinerary if it exists and is a URL
		if (processedData.image_itinerary && isUrl(processedData.image_itinerary)) {
			try {
				processedData.image_itinerary = await urlToBase64(
					processedData.image_itinerary
				);
			} catch (error) {
				console.warn('Failed to convert image_itinerary URL to base64:', error);
				// Keep the original value if conversion fails
			}
		}

		// Process itinerary_details if it exists and is a URL
		if (
			processedData.itinerary_details &&
			isUrl(processedData.itinerary_details)
		) {
			try {
				processedData.itinerary_details = await urlToBase64(
					processedData.itinerary_details
				);
			} catch (error) {
				console.warn(
					'Failed to convert itinerary_details URL to base64:',
					error
				);
				// Keep the original value if conversion fails
			}
		}

		// Process any other image fields that might exist in the booking data
		const imageFields = [
			'passport_copy',
			'visa_copy',
			'id_copy',
			'payment_proof',
		];
		for (const field of imageFields) {
			if (processedData[field] && isUrl(processedData[field])) {
				try {
					processedData[field] = await urlToBase64(processedData[field]);
				} catch (error) {
					console.warn(`Failed to convert ${field} URL to base64:`, error);
					// Keep the original value if conversion fails
				}
			}
		}

		return processedData;
	} catch (error) {
		console.error('Error processing booking images:', error);
		return bookingData; // Return original data if processing fails
	}
};
