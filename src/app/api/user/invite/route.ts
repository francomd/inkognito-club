import FirebaseAdmin from "@/services/firebaseAdminService";

export async function GET() {
  try {
    const invites = await FirebaseAdmin.firestore()
      .collection("invites")
      .doc("list")
      .get();

    const inviteList = invites.data() as { userList: string[] };
    return Response.json([...inviteList.userList]);
  } catch (e) {
    return new Response("Cannot access invites collection", { status: 400 });
    // res.status(400).end();
  }
}
