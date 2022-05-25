import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import useUser from "../../lib/useUser";
import AdminLayout from '../../components/admin_layout';

export default function UserIndex() {
  const { user } = useUser({
    redirectTo: "/user/login",
  });
  return (
    <>
      <Head>
        <title>用户主页</title>
      </Head>
      <Container>
        <Row className="py-5 text-center">
          <h1>总之这里是主页，要显示提问列表</h1>
        </Row>
      </Container>
    </>
  );
}

UserIndex.customLayout = function customLayout(page) {
  return (
    <AdminLayout>{page}</AdminLayout>
  )
}