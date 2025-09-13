import React, { useEffect, useState } from 'react'
import AuthService from '../../cores/services/auth_service'
import { useNavigate } from "react-router";
import { Tabs, Badge } from 'antd';
import UsersView from '../tab_views/users_view';
import DetailsView from '../tab_views/details_view';
import TopMenu from '../../components/top_menu';
import agent from '../../cores/api/agent';

const MainView = () => {

    const [usersCount, setUsersCount] = useState(0);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        AuthService.isLoggedIn(navigate);
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        agent.users.getAllUsers().then((response) => {
            setUsersCount(response.data.length);
            setUsers(response.data);
        });
    }

    const items = [
        {
            label:<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}> <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "black", marginRight: "10px" }}>Users</h4><Badge color="green" count={usersCount} /></div>,
            key: "1",
            children: <UsersView users={users} />,
        },
        // {
        //     label: <h4 style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Details</h4>,
        //     key: "2",
        //     children: <DetailsView />,
        // }
    ]

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <TopMenu />
            <div
                style={{
                    display: "flex",
                    minHeight: "90vh",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}
            >

                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    style={{ width: "100%", color: "black" }}

                />
            </div>
        </div>
    )
}

export default MainView
