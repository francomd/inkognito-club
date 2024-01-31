import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import FirebaseAdmin from "@/services/firebaseAdminService";
import { TUser } from "@/types/User";

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
    <html lang="en">
      <body>
        <AuthContextProvider invites={invites} users={users}>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;