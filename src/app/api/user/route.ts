import FirebaseAdmin from "@/services/firebaseAdminService";

export async function GET() {
  try {
    const usersSnap = await FirebaseAdmin.firestore().collection("users").get();

    const users = usersSnap.docs.map((user) => user.data());
    return Response.json([...users]);
  } catch (e) {
    return new Response("Cannot access users collection", { status: 400 });
    // res.status(400).end();
  }
}
