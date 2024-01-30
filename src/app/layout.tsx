import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import { InviteService } from "@/services/inviteService";
import { UserService } from "@/services/userService";

async function getInvites() {
  return InviteService.getInvites();
}

async function getUsers() {
  return UserService.getAllUsers();
}

export const metadata: Metadata = {
  title: "Inkognito Club",
  description: "Club de dibujo cordobés",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const invites = await getInvites();
  const users = await getUsers();
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