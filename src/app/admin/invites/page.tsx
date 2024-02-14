'use client'

import { Button, Flex, Form, Input, Modal, notification, Table, Typography } from 'antd';
const { Title } = Typography;
const { Item: FormItem } = Form;
import { useEffect, useState } from 'react';
import { firestore } from '@/services/firebaseService';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { sendInvite } from '@/app/actions';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }
];

const sendEmail = (email: string) => {
  console.log('Sending email to:', email);
  sendInvite(email);
}

const InvitesPage = () => {
  const [invites, setInvites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteSending, setInviteSending] = useState(false);

  const [formRef] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const onFinish = (values: { email: string }) => {
    const { email } = values;
    setInviteSending(true);

    if (invites.find((invite) => invite === email)) {
      setInviteSending(false);
      setIsModalOpen(false);
      formRef.resetFields();
      sendEmail(email);
      fireInvitedNotification();
      return;
    }

    setDoc(doc(firestore, "invites", 'list'), {
      userList: [...invites, email]
    }).then((res) => {
      console.log('Success:', res);
    }).catch((error) => {
      console.error('Error:', error);
    }).finally(() => {
      sendEmail(email);
      fireInvitedNotification();
      getInvites();
      setIsModalOpen(false);
      setInviteSending(false);
      formRef.resetFields();
    });
  };

  const fireInvitedNotification = () => {
    notification.success({
      message: 'Invitación enviada',
      description:
        'Se ha enviado la invitación al correo electrónico.',
    });
  }

  const getInvites = () => {
    setLoading(true);

    getDoc(doc(firestore, "invites", 'list'))
      .then((snapshot) => {
        return snapshot.data();
      }).then((data) => {
        setInvites(data?.userList);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getInvites();

    return () => {
      setInvites([]);
      setLoading(true);
    }
  }, [])

  const dataSource = invites.map((invite) => {
    return {
      email: invite
    }
  })

  return (
    <>
      <Flex justify="space-between">
        <Title level={3}>
          Invitaciones
        </Title>
        <Button onClick={showModal}>+ Invitar</Button>
        <Modal title="Invitar Miembro" open={isModalOpen} onCancel={handleCancel} footer={[]}>
          <Form
            name="invite"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
            form={formRef}
          >
            <FormItem
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </FormItem>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={inviteSending}>
                Invitar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </>
  )
}

export default InvitesPage;