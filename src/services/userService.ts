import { TUser } from "@/types/User";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/user`);

  return response.json();
};

const getUser = async (uid: Pick<TUser, "uid">) => {
  const response = await fetch(`${API_URL}/user/${uid}`);

  return response.json();
};

const updateUser = async (user: TUser) => {
  const response = await fetch(`${API_URL}/user/${user.uid}`, {
    method: "PUT",
    body: JSON.stringify(user)
  });

  // if (response.status === 200) {
  //   mutate(`${API_URL}/user/${user.uid}`);
  // } else {
  //   console.log(response);
  // }

  return response.json();
};

const newUser = async (user: Omit<TUser, "createdAt" | "updatedAt">) => {
  console.log("add new user");
  const response = await fetch(`${API_URL}/user/create`, {
    method: "POST",
    body: JSON.stringify(user)
  });

  // if (response.status === 200) {
  //   mutate(`${API_URL}/user`);
  // } else {
  //   console.log(response);
  // }

  return response.json();
};

const deleteUser = async (uid: string) => {
  const response = await fetch(`${API_URL}/user/${uid}`, {
    method: "DELETE",
    body: JSON.stringify(uid)
  });

  // if (response.status === 200) {
  //   mutate(`${API_URL}/user`);
  // } else {
  //   console.log(response);
  // }

  return response.json();
};

export const UserService = {
  getAllUsers,
  // getUser,
  // updateUser,
  newUser
  // deleteUser
};
