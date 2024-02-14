import type { Metadata } from "next";
import AdminLayout from "./AdminLayout";

export const metadata: Metadata = {
  title: "ADMIN - Inkognito Club",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}

export default RootLayout;