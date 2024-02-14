import { redirect } from "next/navigation";

export async function GET() {
  redirect(`/admin/users`); // Navigate to the new post page
}
