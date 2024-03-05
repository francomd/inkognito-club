export type TUser = {
  uid: string;
  memberNumber: number;
  email: string;
  displayName: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  avatar?: string;
};
