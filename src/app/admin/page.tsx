'use client'
import { UserAuth } from '@/context/AuthContext';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Admin() {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setLoading(false);
    }
  }, [user])

  return (
    <main>
      {loading ? (<p>Loading...</p>) : (
        <>
          <h1>Admin</h1>
          <h3>User details</h3>
          <p>{user?.email}</p>
          <p>{user?.displayName}</p>
          <p>{user?.role}</p>
          <p>{user?.avatar}</p>
          <Button type="primary" onClick={logOut}>Logout</Button>
        </>
      )}
    </main>
  );
}
