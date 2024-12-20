import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from "react";
import { SessionProvider } from "next-auth/react";

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body>
      <SessionProvider session={session}>
        <Layout>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items2}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb
                items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                style={{ margin: '16px 0' }}
              />
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: "rgb(255, 255, 255)",
                  borderRadius: "8px",
                }}
              >
                <AntdRegistry>{children}</AntdRegistry>
              </Content>

              {/* <LayoutFooter></LayoutFooter> */}
            </Layout>
          </Layout>
        </Layout>
      </SessionProvider>
      </body>
    </html>
  );
}
