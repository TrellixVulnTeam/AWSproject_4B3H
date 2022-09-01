//import logo from './logo.svg';
//import {Button, Radio} from 'antd';
import {Layout, Menu, Breadcrumb, Table, Spin, Empty, Button, Badge, Tag, Avatar} from 'antd';
import { useState, useEffect} from 'react';
import React from 'react';
import {getAllStudent} from "./client";
import './App.css';
//import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined, PlusOutlined
} from '@ant-design/icons';

import StudentDrawerForm from "./StudentDrawerForm";

const { Header, Content, Footer, Sider } = Layout;
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if(trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if(split.length === 1) {
        return <Avatar>{name.charAt((0))}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
}

const columns = [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudent()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(()=> {
        console.log("component is mounted");
        fetchStudents();
    }, []);
    if(students.length <= 0) {
        return "no data";
    }

    const renderStudents = () => {
        if(fetching) {
            return <Spin indicator = {antIcon} />
        }
        if(students.length <= 0) {
            return <Empty />;
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
        <Table
            dataSource={students}
            columns={columns}
            bordered
            title = {() =>
                <>
                    <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    size="small">
                    Add New Student
                </Button>
                    <Tag style={{marginLeft:"10px"}}>Number of student</Tag>
                    <Badge count={students.length} className="site-badge-count-4"/>
                </>
                    }
            pagination={{ pageSize: 50 }}
            scroll={{ y: 400 }}
            rowKey={(students) => students.id}
        />;
        </>
    }

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {renderStudents()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                By HongChao
            </Footer>
        </Layout>
    </Layout>

}

export default App;
