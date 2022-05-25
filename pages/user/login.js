import { useState } from "react";
import AdminLayout from '../../components/admin_layout';
import Head from 'next/head';
import { Form, Button, Container, Row } from "react-bootstrap";
import { SHA3 } from 'sha3'
import fetchJson, { FetchError } from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
export default function AdminLogin() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/user/profile",
    redirectIfFound: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = new SHA3(256);
    hash.update(e.currentTarget.password.value);  //// first sha3 on client side
    const body = {
      username: e.currentTarget.username.value,
      password: hash.digest('hex')
    };
    console.log(body);
    try {
      mutateUser(
        await fetchJson("/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
      );
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  };

  return (
    <>
      <Head>
        <title>登录</title>
      </Head>
      <Container className="py-5">
        <Row lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>用户名/电子邮箱</Form.Label>
              <Form.Control type="email" name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>密码</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>
            <div className="text-center mt-1">
              <Button variant="primary" type="submit">
                登录
              </Button>
            </div>
          </Form>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </Row>
      </Container>
    </>
  );
}

AdminLogin.customLayout = function customLayout(page) {
  return (
    <AdminLayout>{page}</AdminLayout>
  )
}