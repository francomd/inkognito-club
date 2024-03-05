'use client'

const { Title } = Typography;
import { Button, Flex, Form, Input, Modal, Popconfirm, Select, Space, Table, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TUser } from '@/types/User';
import { useEffect, useMemo, useState } from 'react';
import { firestore } from '@/services/firebaseService';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { isMobile } from 'react-device-detect';

const { Item: FormItem } = Form;
const { Option } = Select;

type TUserK = TUser & { key: string };

const UsersPage = () => {
  const [users, setUsers] = useState<TUserK[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSelected, setUserSelected] = useState<TUserK | null>(null);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [formRef] = Form.useForm();

  const getUsers = () => {
    getDocs(collection(firestore, "users"))
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return doc.data();
        }) as TUser[]
      }).then((data) => {
        const dataWithKey = data.map((user) => {
          return {
            ...user,
            key: user.uid
          }
        })
        setUsers(dataWithKey);
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

  const handleCloseUserEditModal = () => {
    setIsUserEditModalOpen(false);
  }

  const handleEditUser = () => {
    formRef.validateFields().then((values): void => {
      const { displayName, email, role } = values;
      setDoc(doc(firestore, "users", userSelected?.uid!), {
        displayName,
        email,
        role,
        updatedAt: new Date().toISOString()
      }, { merge: true }).then(() => {
        getUsers();
        handleCloseUserEditModal();
      })
    })
  }

  const columns = useMemo(() => {
    let col = [
      {
        title: '#',
        dataIndex: 'memberNumber',
        key: 'memberNumber',
      },
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
        render: (uid: string, record: TUserK) =>
        (
          <Space size="middle">
            <Button type="link" style={{ color: "black", fontSize: "20px" }} icon={<EditOutlined />} onClick={() => {
              setIsUserEditModalOpen(true)
              setUserSelected(record)
            }} />
            <Popconfirm
              title="Borrar"
              description="¿Estás seguro de eliminar este usuario?"
              onConfirm={() => onDelete(uid, record.email)}
              okText="Borrar"
              cancelText="Cancelar"
            >
              <Button type="link" style={{ color: 'red', fontSize: "20px" }} icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      },
    ];

    isMobile && col.pop()

    return col;
  }, []);

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
        <Flex justify='space-between'>
          Usuarios
          {isMobile && (
            <Flex gap={16}>
              <Button type="link" icon={<EditOutlined style={{ color: "black", fontSize: "20px" }} />} disabled={!!!userSelected} onClick={() => setIsUserEditModalOpen(true)} />
              <Popconfirm
                title="Borrar"
                description="¿Estás seguro de eliminar este usuario?"
                onConfirm={() => onDelete(userSelected?.uid!, userSelected?.email!)}
                okText="Si"
                cancelText="No"
                disabled={!!!userSelected}
              >
                <Button type="link" icon={<DeleteOutlined style={{ color: "red", fontSize: "20px" }} />} disabled={!!!userSelected} />
              </Popconfirm>
            </Flex>
          )}
        </Flex>
      </Title>
      <Table dataSource={users} columns={columns} loading={loading} {...isMobile && {
        rowSelection: {
          type: 'radio', onSelect: (record: TUserK) => {
            if (isMobile) {
              setUserSelected(record);
              console.log('record', record);
            }
          },
        }
      }} />
      <Modal title="Editar usuario" open={isUserEditModalOpen} onCancel={handleCloseUserEditModal} onOk={handleEditUser} footer={[
        <Button key="back" onClick={handleCloseUserEditModal}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleEditUser}>
          Guardar
        </Button>,
      ]}>
        <Form
          name="editUser"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          layout='vertical'
          form={formRef}
          initialValues={{
            displayName: userSelected?.displayName,
            email: userSelected?.email,
            role: userSelected?.role
          }}
        >
          <FormItem
            label="Nombre"
            name="displayName"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre del usuario',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'El email no es válido',
              },
              {
                required: true,
                message: 'Por favor ingrese el email del usuario',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Rol"
            name="role"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione el rol del usuario',
              },
            ]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">Usuario</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default UsersPage;