import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ModalDelete({ isOpen, closeModal, endpoints, columnDetail }) {
    if (!isOpen) return null;

    const handleDelete = () => {
        axios.delete(endpoints.delete, {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                closeModal();
                window.location.reload(); // Refresh the page to reflect changes
            });
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        });
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                    <p>Are you sure you want to delete this {columnDetail}?</p>
                    <div className="mt-4 flex justify-end">
                        <button onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2">Delete</button>
                        <button onClick={closeModal} className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
