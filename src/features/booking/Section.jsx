import { PenSquare } from 'lucide-react'
import React, { useState } from 'react'

export default function Section({title, editable=false, children}) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => setIsEditing(false);

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {editable && (
                    isEditing ? (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="p-1 hover:bg-gray-600 rounded text-blue-400"
                            onClick={handleEditClick}
                        >
                            <PenSquare size={16} />
                        </button>
                    )
                )}
            </div>
            
            <div className="border-t border-gray-700">
                {/* Children as function: children(isEditing) */}
                {typeof children === 'function' ? children(isEditing) : children}
            </div>
        
        </div>
    )
}