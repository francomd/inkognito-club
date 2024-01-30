import { TUser } from "@/types/User";
import FirebaseAdmin from "@/services/firebaseAdminService";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<any> {
  try {
    let newUser = await request.json();
    const users = await FirebaseAdmin.firestore().collection("users").get();
    const usersData = users.docs.map((users) => users.data()) as TUser[];

    if (usersData.some((user) => user.email === newUser.email)) {
      return new Response("User already exists", { status: 409 });
    } else {
      const results = await new Promise((resolve, reject) => {
        newUser = {
          ...newUser,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        FirebaseAdmin.firestore()
          .collection("users")
          .doc(newUser.uid)
          .set(newUser)
          .then(() => {
            resolve(newUser);
          })
          .catch(() => {
            reject(false);
          });
      });

      return NextResponse.json(results, { status: 201 });
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
