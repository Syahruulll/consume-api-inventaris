import React from "react";

export default function ImageModal({ isVisible, imageUrl, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <button onClick={onClose} className="mb-2 text-red-500">Close</button>
                <img src={imageUrl} alt="Proff File" />
            </div>
        </div>
    );
}
