'use client'
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = UserAuth();
  const router = useRouter();


  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user])

  return children;
}

export default AdminGuard;

