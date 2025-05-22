import React, { useRef } from "react";
import { Plus, X } from "lucide-react";

function AttachmentsSection({ images, setImages }) {
	const fileInputRef = useRef();

	const handleAddImage = (e) => {
		const files = Array.from(e.target.files);
		if (files.length) {
			const newImages = files.map((file) => ({
				id: Date.now() + Math.random(),
				file,
				url: URL.createObjectURL(file),
			}));
			setImages((prev) => [...prev, ...newImages]);
		}
		e.target.value = null;
	};

	const handleRemoveImage = (id) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
	};

	return (
		<div className="p-3 border border-gray-700 rounded-lg mb-4">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold">Attachments</h3>
				<button
					type="button"
					className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
					onClick={() => fileInputRef.current.click()}
				>
					<Plus className="w-4 h-4" />
					Add Image
				</button>
				<input
					type="file"
					accept="image/*"
					multiple
					ref={fileInputRef}
					className="hidden"
					onChange={handleAddImage}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				{images.map((img) => (
					<div
						key={img.id}
						className="relative w-32 h-32 border border-gray-600 rounded overflow-hidden bg-gray-800"
					>
						<img
							src={img.url}
							alt="Attachment"
							className="object-cover w-full h-full"
						/>
						<button
							type="button"
							className="absolute top-1 right-1 bg-gray-900 bg-opacity-70 rounded-full p-1 text-red-400 hover:text-red-200"
							onClick={() => handleRemoveImage(img.id)}
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				))}
				{images.length === 0 && (
					<span className="text-gray-400 text-sm">No attachments added.</span>
				)}
			</div>
		</div>
	);
}

export default AttachmentsSection;
