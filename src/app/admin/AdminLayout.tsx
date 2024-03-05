'use client'

import React, { useEffect, useState } from 'react';
// import AdminDetails from './AdminDetails';
import AdminGuard from './AdminGuard';

import { LogoutOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
const { Title } = Typography;
import "./styles.css"
import { isDesktop, isMobile } from 'react-device-detect';

const items = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Usuarios',
  },
  {
    key: 'invites',
    icon: <PlusSquareOutlined />,
    label: 'Invitaciones',
  },
];


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()
  const { handleLogOut } = UserAuth();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(true);

  const getSelectedMenuByPath = () => {
    return pathname.replace('/admin/', '')
  }

  useEffect(() => {

    isDesktop && setIsSiderCollapsed(false)
  }, [isDesktop])

  return (
    <AdminGuard>
      <Layout style={{ height: "100vh" }} hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={isSiderCollapsed}
          onCollapse={(collapsed) => setIsSiderCollapsed(collapsed)}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[getSelectedMenuByPath()]} items={items} onSelect={(item) => {
            router.push(`${item.key}`)
            isMobile && setIsSiderCollapsed(true)
          }} />
          <div className='logout-button'>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogOut}
            >
              Cerrar sesión
            </Button>
          </div>
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