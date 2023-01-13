import Head from "next/head";
import { ButtonGroup, Container, Row, Table, ToggleButton } from "react-bootstrap";
import useUser from "../../lib/useUser";
import AdminLayout from '../../components/admin_layout';
import { useEffect, useState } from "react";
import styles from '../../styles/userHome.module.css'
import _ from 'lodash'

export default function UserIndex() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [checked, setChecked] = useState(false)

  const { user } = useUser({
    redirectTo: "/user/login",
  });

  useEffect(() => {
    if (user) {
      setLoading(true)
      fetch(`/api/questions?owner=${user._id}`)
        .then(res => res.json())
        .then(json => {
          setQuestions(json)
          setLoading(false)
        });
    }
  }, [user])

  // const handleCheckChange = function (row, e) {
  //   row.choose = e.currentTarget.checked;
  // }

  const onChangeSelected = (row) => {
    console.log(selectedQuestions, questions);
    const { _id } = row
    const isSelected = selectedQuestions?.includes(_id)
    const newSelectedQuestions = isSelected ? selectedQuestions?.map(id => id != _id) : [...selectedQuestions, _id]
    setSelectedQuestions(newSelectedQuestions)
  }
  const isChecked = (row) => selectedQuestions?.includes(row?._id)

  console.log(questions);
  const tableItems = questions.map(row =>
    <tr key={row._id}>
      <td>{row._id.slice(-6)}</td>
      <td>{row.content}</td>
      <td>{new Date(row.created_time).toLocaleString("zh-CN")}</td>
      <td>
        <ButtonGroup>
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={isChecked(row)}
          value="1"
          onChange={(e) => onChangeSelected(row)}
        >
          选中
        </ToggleButton>
        </ButtonGroup>{' '}
        <a href="#">查看</a>{' '}
        <a href="#">删除</a>
      </td>
    </tr>)

  return (
    <>
      <Head>
        <title>用户主页</title>
      </Head>
      <Container>
        <Row className="py-5 text-center">
          <h1>总之这里是主页，要显示提问列表</h1>
        </Row>
        <Row className="py-5 text-center">
          <Table bordered hover className={styles.qTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>棉花糖内容</th>
                <th>提交时间</th>
                <th style={{ minWidth: '150px' }}>操作</th>
              </tr>
            </thead>
            <tbody>{tableItems}
            </tbody>
          </Table>
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