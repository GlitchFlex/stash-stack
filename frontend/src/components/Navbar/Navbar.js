import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popover } from 'antd';
import { UserOutlined, RollbackOutlined } from '@ant-design/icons';

import "./Navbar.css";



const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const token = localStorage.getItem("token");

        axios({
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/logout`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async () => {
            const isTokenExists = await localStorage.getItem("token");
            if (isTokenExists) {
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    const handleDeleteAcc = () => {
        const token = localStorage.getItem("token");

        axios({
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/delete`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            console.log("User Account deleted");
            localStorage.removeItem("token");
            navigate("/");
        });
    };

   

    return (
        <div className="Navbar">
            <div className="NavTitle">
                <Link className="NavTitle" to="/dashboard">
                    <h4 className="Titletext">StashStack</h4>
                </Link>
            </div>

            <div className="NavBtns">
                {/* <button className="CreateNote" onClick={handleSignOut}>
                    Sign Out
                </button>
                <button
                    className="CreateNote DelAccountBtn"
                    onClick={handleDeleteAcc}
                >
                    Delete Account
                </button> */}
                <Popover
                    content={
                        <div>
                            <Button
                                onClick={handleSignOut}
                                type="danger"
                                style={{ border: 'none', borderRadius: '7px' }}
                                icon={<RollbackOutlined />}
                            >
                                Logout
                            </Button>
                        </div>
                    }
                    trigger="hover"
                >
                    <Button
                        style={{
                            borderRadius: '46px',
                            backgroundColor: '#fbbc04',
                            width: '45px',
                            border : "none",
                            height: '45px',
                            padding: '11px',
                        }}
                    >
                        <UserOutlined
                            style={{ color: '#fff', fontSize: '1.2rem' }}
                        />
                    </Button>
                </Popover>
            </div>
        </div>
    );
};

export default Navbar;
