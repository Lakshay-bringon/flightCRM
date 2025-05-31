import React, { useRef, useState, useEffect } from 'react';
import { CloudUpload, Trash } from 'lucide-react';

export default function ItineraryDetailsInput({
	value,
	onChange,
	image,
	setImage,
	onImageClick,
}) {
	const fileInputRef = useRef(null);
	const [preview, setPreview] = useState(image || null);

	// Ensure preview updates correctly when `value` changes
	useEffect(() => {
		if (value && typeof value === 'string') {
			const baseRoute = import.meta.env.VITE_UPLOADS_BASE_URL || '';
			const constructedUrl = value.startsWith(baseRoute)
				? value
				: `${baseRoute}${value}`;

			setPreview(constructedUrl);
		} else {
			setPreview(null);
		}
	}, [value]);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (
					typeof reader.result === 'string' &&
					reader.result.startsWith('data:image/')
				) {
					setPreview(reader.result);
					setImage && setImage(reader.result);
				} else {
					console.warn('Invalid base64 image string:', reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageRemove = () => {
		setPreview(null);
		setImage && setImage(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (
					typeof reader.result === 'string' &&
					reader.result.startsWith('data:image/')
				) {
					setPreview(reader.result);
					setImage && setImage(reader.result);
				} else {
					console.warn('Invalid base64 image string:', reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e) => e.preventDefault();

	return (
		<div className="p-3 border border-gray-700 rounded-lg mb-6">
			<h3 className="font-semibold mb-2">Itinerary Details</h3>
			{preview ? (
				<div className="flex items-center justify-between bg-gray-700 text-white px-3 py-2 rounded mb-2">
					<div
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (preview) {
								onImageClick(preview);
							} else {
								console.warn('No image available for preview');
							}
						}}
						className="flex items-center space-x-4 w-full overflow-hidden cursor-pointer"
					>
						<img
							src={preview}
							alt="Itinerary"
							className="w-12 h-12 object-cover rounded"
						/>
						<p className="truncate">Itinerary Image</p>
					</div>
					<button onClick={handleImageRemove} className="ml-4">
						<Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
					</button>
				</div>
			) : (
				<div
					className="border-dashed border-2 border-gray-400 p-6 text-center rounded cursor-pointer hover:border-blue-400 transition-colors mb-2"
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onClick={() => fileInputRef.current && fileInputRef.current.click()}
				>
					<p className="text-gray-400 flex flex-col items-center justify-center">
						<CloudUpload className="w-10 h-10 mb-2" />
						Drag and drop an image here, or click to select an image
					</p>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="hidden"
					/>
				</div>
			)}
		</div>
	);
}
