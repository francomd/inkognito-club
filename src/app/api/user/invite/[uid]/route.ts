import FirebaseAdmin from "@/services/firebaseAdminService";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const newEmail = JSON.parse(params.email);
    const invites = await FirebaseAdmin.firestore()
      .collection("invites")
      .doc("list")
      .get();
    const userList = invites.data() as string[];

    if (userList.some((email: string) => email === newEmail)) {
      return NextResponse.json(
        { error: "User already invited" },
        { status: 409 }
      );
    } else {
      const results = new Promise((resolve, reject) => {
        FirebaseAdmin.firestore()
          .collection("invites")
          .doc("list")
          .set([...userList, newEmail])
          .then(() => {
            resolve({ invited: newEmail });
          })
          .catch((e) => {
            reject(e);
          });
      });

      return NextResponse.json(results, { status: 201 });
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
