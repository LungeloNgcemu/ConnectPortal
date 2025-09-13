import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Tag } from 'antd';

const UsersView = ({ users }) => {

    const dataSource = users.map((user) => ({
        key: user.id,
        UserName: user.UserName,
        Role: user.Role,
        Gender: user.Gender,
        PhoneNumber: user.PhoneNumber,
        ProfileImage: user.ProfileImage,
    }));

    const columns = [
        { title: 'Name', dataIndex: 'UserName', key: 'name' },
        { title: 'Role', dataIndex: 'Role', key: 'role' },
        {
            title: 'Gender',
            dataIndex: 'Gender',
            key: 'gender',
            render: (gender) => (
                <Tag color={gender.toLowerCase() === 'female' ? 'green' : 'blue'}>
                    {gender}
                </Tag>
            )
        },
        { title: 'Phone Number', dataIndex: 'PhoneNumber', key: 'phoneNumber' },
        {
            title: 'Profile Image',
            dataIndex: 'ProfileImage',
            key: 'profileImage',
            render: (src) => src ? <img src={src} alt="Profile" style={{ width: 60,height: 60, borderRadius: '50%' }} /> : null
        },
    ];

    return (
        <div style={{ color: "black" }}>
            <Table
                rowClassName="custom-row"
                dataSource={dataSource}
                columns={columns}
                pagination={{ position: ['bottomCenter'], pageSize: 10 }}
            />
        </div>
    );
};

export default UsersView;



