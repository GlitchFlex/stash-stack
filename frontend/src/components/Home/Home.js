import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import notFound from './notFound.webp';

// import DeleteIcon from "@material-ui/icons/Delete";
import {PlusOutlined, DeleteFilled } from '@ant-design/icons';
import CreateModal from "../CreateModal";
import { message, Popconfirm } from "antd";

const Home = () => {
    const [noteList, setNotes] = useState([]);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [note, setNote] = useState(null);

    const callFn = () => {
        const token = localStorage.getItem("token");

        axios
            .get(`${process.env.REACT_APP_NOTERAPP_BACKEND}/notes`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
                setNotes(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        callFn();
    }, []);

    useEffect(() => {
        callFn();
    }, [setNotes]);


    const token = localStorage.getItem("token");

    const confirm = ()=>{
        axios({
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${note?._id}`,

            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(()=>{

            window.location.reload(true);
            message.success(`Note deleted`);
        }
            
        );
    }


    const handleYesDelete = () => {
        
    };

    const colorArray = ["#f28b82", "#fbbc04", "#9646ef", "#1ec895", "#4460f1", "#2ED2FF", "#FF4CFF"]
    const colorArrayOpacity = ["#f28b8299", "#fbbc0499", "#9646ef99", "#1ec89599", "#4460f199", "#ADEDFF", "#FFCAFF"]

    return (
        <div className="Home">
            <div
                style={{
                    width: '102.5%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >   
                <h1 className="HomeNotes">Your Stashes</h1>
                <CreateModal
                    createModalIsOpen={createModalIsOpen}
                    setCreateModalIsOpen={setCreateModalIsOpen}
                />

                <button
                    className="AddBtn"
                    onClick={() => {
                        setCreateModalIsOpen(true);
                    }}
                >
                    <PlusOutlined
                        style={{ color: '#fff', fontSize: '1.2rem' }}
                    />
                </button>
            </div>
            {!noteList ||
                (noteList.length == 0 && (
                    <div style = {{display : "flex",flexDirection : "column" ,alignItems : "center", justifyContent : "space-around"}}>
                    <img style = {{width : "50%"}} src={notFound} alt="" />
                    <p style={{color : "black"}}>No stash to show</p>
                    </div>
                ))}
            <div className="NoteList">
                {noteList && (
                    <>
                        {noteList.map((note, i) => (
                            <div
                                className="Note"
                                style={{
                                    backgroundColor: colorArrayOpacity[i % 7],
                                }}
                            >
                                <div
                                    className="NoteContent"
                                    style={{ color: colorArray[i % 7] }}
                                >
                                    <p style={{ marginBottom: '10px' }}>
                                        {note?.title}
                                    </p>
                                    <p>
                                        {note.content.length > 50
                                            ? note.content.substring(0, 50) +
                                              '...'
                                            : note.content}
                                    </p>
                                </div>
                                <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={confirm}
                                    onClick = {()=>{setNote(note)}}
                                    onCancel={()=>{}}
                                    okText="Delete"
                                    cancelText="Cancel"
                                >
                                    <DeleteFilled  style = {{ color : colorArray[i % 7], fontSize : "20px", position : "relative", top : "4px", right :"4px"}}/>
                                </Popconfirm>
                            </div>
                        ))}{' '}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
