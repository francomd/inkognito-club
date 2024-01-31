'use client'

import { UserAuth } from "@/context/AuthContext";

const AdminDetails = () => {
  const { user } = UserAuth();
  return (
    <>
      <h3>User details</h3>
      <p>{user?.email}</p>
      <p>{user?.displayName}</p>
      <p>{user?.role}</p>
      <p>{user?.avatar}</p>
    </>
  )
}

export default AdminDetails