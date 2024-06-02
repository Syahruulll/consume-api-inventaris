import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ModalDelete from "../components/ModalDelete";

export default function Inbound() {
    const dataThParent = [
        "#",
        "Stuff_id",
        "Total",
        "Date",
        "proff file",
    ];

    const [inbounds, setInbound] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:800/inbound-stuffs', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbound(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const coloumDataBase = {
        "stuff_id" : "",
        "total" : "",
        "date" : "",
        "proff_file" : null,
    };

    const buttons = [
        "show",
        "delete"
    ];

    const endpoints = {
        "detail": "http://localhost:800/inbound-stuffs/detail/{id}",
        "delete": "http://localhost:800/inbound-stuffs/delete/{id}",
        "update": "http://localhost:800/inbound-stuffs/update/{id}",
    
    
    };

    const columnDetailModalDelete = 'stuff_id';
  

    return (
        <>
            <div className="container mx-auto p-12">
                <div className="flex justify-between items-center mt-10">
                    <Navbar />
                </div>
                <Link to={'/inbound-stuff'} className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Back</Link>
                <Table 
                    dataTh={dataThParent} 
                    dataTd={inbounds} 
                    coloumDB={coloumDataBase} 
                    buttonData={buttons} 
                    endpoints={endpoints} 
                    columnDetail={columnDetailModalDelete} 
                   
                />
            </div>
        </>
    );
}


