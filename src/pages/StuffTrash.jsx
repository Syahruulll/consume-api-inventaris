import React, { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StuffTrash() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});
    const [errorData, setErrorData] = useState({});
   
    useEffect(() => {
            axios.get('http://localhost:800/stuffs/trash', {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                }
            })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "name" : null,
        "category" : null,
        
    }

        const buttons = [
            "restore",
            "permanent-delete",
            
        ]
        

        const endpoints = {
            "restore" : "http://localhost:800/stuffs/trash/restore/{id}",
            "permanent-delete" : "http://localhost:800/stuffs/trash/permanent-delete/{id}",
           
        }

        const columnDetailModalDelete = ''
        const judulModalEdit = ''

        const inputData = {}
    
    
    return(
        <>
           <div className="container mx-auto p-12">
      <div className="flex justify-between items-center mt-10">
        <Link to={'/stuffs'} className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Back</Link>
        <Navbar />
      </div>
      <Table
        dataTh={dataThParent}
        dataTd={stuffs}
        coloumDB={coloumDataBase}
        buttonData={buttons}
        endpoints={endpoints}
        columnDetail={columnDetailModalDelete}
        judulModalEdit={judulModalEdit}
        inputData={inputData}
      />
    </div>
        </>
    )
}