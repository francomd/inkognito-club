import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import FirebaseAdmin from "@/services/firebaseAdminService";
import { TUser } from "@/types/User";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { gray } from '@ant-design/colors';
import '@/app/globals.css'


export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Inkognito Club",
  description: "Club de dibujo cordobés",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const invites = await FirebaseAdmin.firestore()
    .collection("invites")
    .doc("list")
    .get()
    .then((doc) => {
      return doc.data() as { userList: string[] };
    })
    .then((data) => {
      return data.userList;
    });

  console.log(invites);

  const users = await FirebaseAdmin.firestore()
    .collection("users")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return doc.data();
      }) as TUser[];
    });

  console.log(users);

  return (
    <html lang='es'>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: gray.primary,
              },
              components: {
                Layout: {
                  siderBg: gray[7],
                  headerBg: gray[1],
                },
                Menu: {
                  darkItemBg: 'transparent',
                  darkItemSelectedBg: gray[6],
                },
              },
            }}
          >
            <AuthContextProvider invites={invites} users={users}>
              {children}
            </AuthContextProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

export default RootLayout;