import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inkognito Club",
  description: "Club de dibujo cordobés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}
