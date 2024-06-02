import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";


export default function Stuff() {

    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

    
    useEffect(() => {
            axios.get('http://localhost:800/stuffs', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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
        "stuffStock": "total_available",
        "stuffStock*": "total_defec",
    }

        const buttons = [
            "edit",
            "delete",
            "create",
            "trash",
        ]
        

        const endpoints = {
            "detail" : "http://localhost:800/stuffs/{id}",
            "delete" : "http://localhost:800/stuffs/delete/{id}",
            "update" : "http://localhost:800/stuffs/update/{id}",
            "store" : "http://localhost:800/stuffs/store/",
            "trash" : "http://localhost:800/stuffs/trash/",
        }

        const columnDetailModalDelete = 'name'
        const judulModalEdit = 'Stuff'

        const inputData = {
            "name" : {
                "type" : "text",
                "options" : null,
            },
            "category" : {
                "type" : "select",
                "options" : ['KLN','HTL', 'Sarpras/Teknisi'],
            }
        }
    return (
        <>
            <Navbar/>
            <div className="p-10">
            <Table dataTh={dataThParent} dataTd={stuffs} coloumDB={coloumDataBase} buttonData={buttons} endpoints={endpoints}
             columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}></Table>
            </div>
        </>
          )
}