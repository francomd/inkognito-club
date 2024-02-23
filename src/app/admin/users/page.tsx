'use client'

const { Title } = Typography;
import { Button, Popconfirm, Space, Table, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TUser } from '@/types/User';
import { useEffect, useMemo, useState } from 'react';
import { firestore } from '@/services/firebaseService';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

const UsersPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
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
  }

  const onDelete = (uid: string, email: string) => {
    console.log('delete', uid, email);
    deleteDoc(doc(firestore, "users", uid)).then(() => {
      getDoc(doc(firestore, "invites", 'list'))
        .then((snapshot) => {
          return snapshot.data();
        }).then((data) => {
          const updatedInvites = data?.userList.filter((_email: string) => _email !== email);
          setDoc(doc(firestore, "invites", 'list'), {
            userList: [...updatedInvites]
          }).then(() => {
            getUsers();
          })
        })
    });
  }

  const columns = useMemo(() => [
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
    },
    {
      title: 'Acciones',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid: string, { email }: { email: string }) =>
      (
        <Space size="middle">
          <Button type="link">
            <EditOutlined style={{ color: "black", fontSize: "20px" }} />
          </Button>
          <Popconfirm
            title="Borrar"
            description="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => onDelete(uid, email)}
            okText="Si"
            cancelText="No"
          >
            <Button type="link">
              <DeleteOutlined style={{ color: 'red', fontSize: "20px" }} />
            </Button>
          </Popconfirm>
        </Space>
      )
    },
  ], []);

  useEffect(() => {
    getUsers();

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