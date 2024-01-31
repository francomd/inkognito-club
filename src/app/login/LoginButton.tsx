'use client'
import { UserAuth } from "@/context/AuthContext";

const LoginButton = () => {
  const { loading, logged, handleSignIn, handleLogOut } = UserAuth();

  if (loading) {
    return (
      <div>
        <p>Let me see who you are...</p>
      </div>
    )
  }

  return logged ? (
    <button onClick={handleLogOut}>Sign Out</button>
  ) : (
    <button onClick={handleSignIn}>Sign In</button>
  )
};

export default LoginButton