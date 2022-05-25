import React from "react";
import Head from "next/head";
import useUser from "../../lib/useUser";
import AdminLayout from '../../components/admin_layout';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "next/image";
import styles from '../../styles/admin.module.css'

export default function UserProfile() {
  const { user } = useUser({
    redirectTo: "/user/login",
  });
  let newPassword = "";

  const blurData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk6PtfDwAEMQIOfdA/vAAAAABJRU5ErkJggg==";

  return (
    <>
      <Head>
        <title>用户主页</title>
      </Head>
      {user && (
        <Container>
          <Row className="py-5 text-center" as="header">
            <h4>个人信息</h4>
          </Row>
          <Row className="py-2">
            <Col lg={2} className="text-center">
              {user.avatar ? (
                <Image src={user.avatar} width={120} height={120} layout="fixed"
                alt="User Avatar" placeholder="blur" blurDataURL={blurData} className={styles.avatar}/>
              ) : (<p>Invalid Image</p>)
              }
              <Button size="sm" className="mt-3">上传新头像</Button>
            </Col>
            <Col>
              <Form /*onSubmit={handleProfileSubmit}*/>
                <Form.Group className="mb-3" controlId="nickname">
                  <Form.Label>昵称</Form.Label>
                  <Form.Control
                    maxLength={16}
                    placeholder="昵称"
                    onChange={(e) => user.nickname = e.target.value}
                    value={user.nickname}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>密码</Form.Label>
                  <Form.Control type="password"
                    maxLength={16}
                    placeholder="留空则不修改"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="introduction">
                  <Form.Label>提问箱介绍</Form.Label>
                  <Form.Control type="password"
                    maxLength={128}
                    placeholder="问你想问的"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-1">
                  修改信息
                </Button>
              </Form>
            </Col>
          </Row>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Container>
      )}
    </>
  );
}

UserProfile.customLayout = function customLayout(page) {
  return (
    <AdminLayout>{page}</AdminLayout>
  )
}