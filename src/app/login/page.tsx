'use client'

import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { googleSignIn } = UserAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    await googleSignIn().then((res) => {
      console.log('user signed in', res)
      router.push('/admin')
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  return (
    <div>
      <h1>Login</h1>
      {loading ? (
        <p>Let me see who you are...</p>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  )
}

export default Login