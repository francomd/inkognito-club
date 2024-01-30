import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { volcano } from '@ant-design/colors';

export const metadata: Metadata = {
  title: "ADMIN - Inkognito Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: volcano.primary,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
