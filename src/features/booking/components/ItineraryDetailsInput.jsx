import React, { useRef, useState, useEffect } from "react";
import { CloudUpload, Trash, Plus } from "lucide-react";

export default function ItineraryDetailsInput({
	images = [], // Changed from image to images array
	setImages, // Changed from setImage to setImages
	onImageClick,
	heading = "Itinerary Details",
	register,
	setValue, // Add setValue prop
}) {
	const fileInputRef = useRef(null);
	const [previews, setPreviews] = useState([]); // Changed to array
	const errorMessage = `${heading} images are required.`;

	useEffect(() => {
		const baseRoute = import.meta.env.VITE_UPLOADS_BASE_URL || "";
		const newPreviews = images
			.map((img) => {
				let imgSrc = null;
				if (img) {
					if (typeof img === "string" && img.startsWith("data:image/")) {
						imgSrc = img;
					} else if (typeof img === "string") {
						imgSrc = img.startsWith(baseRoute) ? img : `${baseRoute}${img}`;
					}
				}
				return imgSrc;
			})
			.filter(Boolean);

		setPreviews(newPreviews);
	}, [images]);

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (
					typeof reader.result === "string" &&
					reader.result.startsWith("data:image/")
				) {
					const newImages = [...images, reader.result];
					setImages && setImages(newImages);
					// Update the form value for validation
					if (setValue) {
						setValue("image_itinerary", newImages);
						console.log(
							"ItineraryDetailsInput: Updated form value with image data"
						);
					}
				} else {
					console.warn("Invalid base64 image string:", reader.result);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const handleImageRemove = (index) => {
		const newImages = images.filter((_, i) => i !== index);
		setImages && setImages(newImages);
		// Update the form value for validation
		setValue && setValue("image_itinerary", newImages);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files).filter((file) =>
			file.type.startsWith("image/")
		);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (
					typeof reader.result === "string" &&
					reader.result.startsWith("data:image/")
				) {
					const newImages = [...images, reader.result];
					setImages && setImages(newImages);
					// Update the form value for validation
					if (setValue) {
						setValue("image_itinerary", newImages);
					}
				} else {
					console.warn("Invalid base64 image string:", reader.result);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const handleDragOver = (e) => e.preventDefault();

	// Handle paste from clipboard
	const handlePaste = (e) => {
		const items = e.clipboardData?.items;
		if (!items) return;

		// Check if clipboard contains an image
		let hasImage = false;
		Array.from(items).forEach((item) => {
			if (item.type.startsWith("image/")) {
				hasImage = true;
				// Only prevent default and stop propagation if we're handling an image
				e.stopPropagation();
				e.preventDefault();

				const file = item.getAsFile();
				const reader = new FileReader();
				reader.onloadend = () => {
					if (
						typeof reader.result === "string" &&
						reader.result.startsWith("data:image/")
					) {
						const newImages = [...images, reader.result];
						setImages && setImages(newImages);
						// Update the form value for validation
						if (setValue) {
							setValue("image_itinerary", newImages);
							console.log(
								"ItineraryDetailsInput: Updated form value with pasted image"
							);
						}
					}
				};
				reader.readAsDataURL(file);
			}
		});

		// If no image found, let the event continue normally for text inputs
		// This allows text to be pasted into focused input fields
	};

	// Attach global paste listener so paste works even if container isn't focused
	useEffect(() => {
		const onGlobalPaste = (e) => handlePaste(e);
		window.addEventListener("paste", onGlobalPaste);
		return () => window.removeEventListener("paste", onGlobalPaste);
	}, [handlePaste]);

	const handleAddImageClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<div className="p-3 border border-gray-700 rounded-lg mb-6">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold">{heading}</h3>
				<button
					type="button"
					onClick={handleAddImageClick}
					className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
				>
					<Plus className="w-4 h-4" />
					Add Image
				</button>
			</div>{" "}
			{/* Image previews */}
			{previews.length > 0 && (
				<div className="space-y-2 mb-4">
					{previews.map((preview, index) => (
						<div
							key={index}
							className="flex items-center justify-between bg-gray-700 text-white px-3 py-2 rounded mb-2"
						>
							<div
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									if (preview) {
										onImageClick(preview);
									} else {
										console.warn("No image available for preview");
									}
								}}
								className="flex items-center space-x-4 w-full overflow-hidden cursor-pointer"
							>
								<img
									src={preview}
									alt={`${heading} ${index + 1}`}
									className="w-12 h-12 object-cover rounded"
								/>
								<p className="truncate">
									{heading.split(" ")[0]} Image {index + 1}
								</p>
							</div>
							<button
								type="button"
								onClick={() => handleImageRemove(index)}
								className="ml-4"
							>
								<Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
							</button>
						</div>
					))}
				</div>
			)}
			{/* Drop zone - always visible */}
			<div
				className="border-dashed border-2 border-gray-400 p-6 text-center rounded cursor-pointer hover:border-blue-400 transition-colors"
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onPaste={handlePaste}
				tabIndex={0}
				onClick={handleAddImageClick}
			>
				<p className="text-gray-400 flex flex-col items-center justify-center">
					<CloudUpload className="w-10 h-10 mb-2" />
					Drag and drop, click to select, or paste images here
				</p>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					onChange={handleImageUpload}
					className="hidden"
				/>
				{/* Hidden input for form registration */}
				<input
					{...register("image_itinerary")}
					type="hidden"
					value={JSON.stringify(images)}
				/>
			</div>
		</div>
	);
}
