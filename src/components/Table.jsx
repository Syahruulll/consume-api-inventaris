import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Table({ dataTh, dataTd, coloumDB, buttonData, endpoints, columnDetail, judulModalEdit, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointReplaced, setEndpointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    const navigate = useNavigate();

    function handleModalDelete(id) {
        const endpointDetail = endpoints['detail'];
        const endpointDelete = endpoints['delete'];

        const detailReplaced = endpointDetail.replace('{id}', id);
        const deleteReplaced = endpointDelete.replace('{id}', id);

        const replaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        };
        
        setEndpointReplaced(replaced);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpointDetail = endpoints['detail'];
        const endpointUpdate = endpoints['update'];

        const detailReplaced = endpointDetail.replace('{id}', id);
        const updateReplaced = endpointUpdate.replace('{id}', id);

        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced
        };
        
        setEndpointReplaced(replaced);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replaced = {
            "store": endpoints['store']
        };
        setEndpointReplaced(replaced);
        setIsOpenModalAdd(true);
    }

    function handleRestore(id) {
        const endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            Swal.fire({
                title: 'Success',
                text: 'Data berhasil di-restore',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/stuffs');  
            });
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            navigate('/login');
        });
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end mb-5">
                    {buttonData.includes("create") && (
                        <button onClick={handleModalAdd} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                    )}
                    {buttonData.includes("trash") && (
                        <Link to={'/stuffs/trash'} className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Trash</Link>
                    )}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(dataTd) && dataTd.map((rowData, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td className="px-6 py-4">{index + 1}.</td>
                                {Object.keys(coloumDB).map((col, colIndex) => (
                                    <td className="px-6 py-4" key={colIndex}>
                                        {typeof rowData[col] === 'string' && (rowData[col].endsWith('.jpg') || rowData[col].endsWith('.png') || rowData[col].endsWith('.JPG')) ? (
                                            <img src={rowData[col]} alt={`Image ${index}`} className="w-16 h-16 object-cover" />
                                        ) : (
                                            <a href={rowData[col]} target="_blank" rel="noopener noreferrer">
                                                {rowData[col]}
                                            </a>
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-5">
                                    {buttonData.includes("edit") && (
                                        <a onClick={() => handleModalEdit(rowData.id)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    )}

                                    {buttonData.includes("show") && (
                                        <a onClick={() => handleModalShow(rowData.id)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show Image</a>
                                    )}

                                    {buttonData.includes("delete") && (
                                        <a onClick={() => handleModalDelete(rowData.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Delete</a>
                                    )}
                                    {buttonData.includes("restore") && (
                                        <a onClick={() => handleRestore(rowData.id)} href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline ml-3">Restore</a>
                                    )}
                                    {buttonData.includes("permanent-delete") && (
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columnDetail={columnDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
        </>
    );
}
