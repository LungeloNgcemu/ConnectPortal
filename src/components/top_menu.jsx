import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import image from '../assets/logo.png';
import StorageService from '../cores/services/storage_service';
import NavigationService from '../cores/services/navigation_service';
import { useNavigate } from "react-router";


const TopMenu = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = StorageService.getUser();
        setUser(user);
    }, []);

    const handleLogout = () => {
        StorageService.clear();
        NavigationService.navigate(navigate, "/");
    }

    return <div style={{ display: "flex", justifyContent: "space-between" }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "start", }}>
            <div className="logoContainer">
                <img src={image} height={"50px"} />
            </div>

            <div>
                <h4>Welcome Back {user?.userName}! | {user?.church}</h4>
            </div>

        </div>

        <Popconfirm title="Are you sure to logout?" placement="left" onConfirm={handleLogout}>
            <Button style={{ marginTop: "20px", marginRight: "20px", marginLeft: "20px", backgroundColor: "red", color: "white", fontWeight: "bold" }} >Logout</Button>
        </Popconfirm>
    </div>;
};
export default TopMenu;