'use client'

import { Typography } from 'antd';
const { Title } = Typography;
import { Table } from 'antd';
import { TUser } from '@/types/User';
import { useEffect, useState } from 'react';
import { firestore } from '@/services/firebaseService';
import { collection, getDocs } from 'firebase/firestore';
import { set } from 'firebase/database';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
  }
];


const UsersPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(firestore, "users"))
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return doc.data();
        }) as TUser[]
      }).then((data) => {
        setUsers(data);
      }).finally(() => {
        setLoading(false);
      });

    return () => {
      setUsers([]);
      setLoading(true);
    }
  }, [])

  return (
    <>
      <Title level={3}>
        Usuarios
      </Title>
      <Table dataSource={users} columns={columns} loading={loading} />
    </>
  )
}

export default UsersPage;