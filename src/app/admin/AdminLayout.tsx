'use client'

import React from 'react';
// import LoginButton from '../login/LoginButton';
// import AdminDetails from './AdminDetails';
import AdminGuard from './AdminGuard';

import { PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from 'antd';
import { redirect } from 'next/dist/server/api-utils';
import { usePathname, useRouter } from 'next/navigation';
const { Title } = Typography;

const items = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Usuarios',
  },
  {
    key: 'invites',
    icon: <PlusSquareOutlined />,
    label: 'Invitar',
  },
];


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()

  const getSelectedMenuByPath = () => {
    return pathname.replace('/admin/', '')
  }

  return (
    <AdminGuard>
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[getSelectedMenuByPath()]} items={items} onSelect={(item) => {
            router.push(`${item.key}`)
          }} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "1rem 2rem",
            }}
          >
            <Title level={3}>
              Inkognito Club Admin
            </Title>

          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {children}
              {/* <AdminDetails />
              <LoginButton /> */}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Inkognito Club {new Date().getFullYear()} | Made with love by Fran & Sophi
          </Footer>
        </Layout>
      </Layout>
    </AdminGuard>
  );
}

export default AdminLayout;