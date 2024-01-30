export type TUser = {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  avatar?: string;
};
