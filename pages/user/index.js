import Head from "next/head";
import { ButtonGroup, Container, Row, Table, ToggleButton } from "react-bootstrap";
import useUser from "../../lib/useUser";
import AdminLayout from '../../components/admin_layout';
import { useState } from "react";
import { useAsyncEffect } from 'ahooks';
import styles from '../../styles/userHome.module.css'
import _ from 'lodash'

export default function UserIndex() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const { user } = useUser({ redirectTo: "/user/login", });

  const getQuestions = async () => {
    const res = await fetch(`/api/questions?owner=${user._id}`)
    const questions = res?.json()
    return questions
  }
  const refreshQuestions = async () => {
    if (_.isEmpty(user)) { return }
    setLoading(true)
    const questions = await getQuestions()
    setQuestions(questions)
  }
  useAsyncEffect(refreshQuestions, [user])

  const onChangeSelected = (row) => {
    const { _id } = row
    const isSelected = selectedQuestions?.map(row => row?._id).includes(_id)
    const newSelectedQuestions = isSelected ? selectedQuestions?.filter(row => row._id != _id) : [...selectedQuestions, row]
    setSelectedQuestions(newSelectedQuestions)
  }
  const isChecked = (row) => selectedQuestions?.map(row => row?._id).includes(row?._id)

  const renderOperations = row => <td>
    <ButtonGroup>
      <ToggleButton
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={isChecked(row)}
        onClick={(e) => onChangeSelected(row)}
      >
        选中
      </ToggleButton>
    </ButtonGroup>{' '}
    <a href="#">查看</a>{' '}
    <a href="#">删除</a>
  </td>
  const renderRow = row => <tr key={row._id}>
    <td>{row._id.slice(-6)}</td>
    <td>{row.content}</td>
    <td>{new Date(row.created_time).toLocaleString("zh-CN")}</td>
    {renderOperations(row)}
  </tr>
  const tableItems = questions.map(renderRow)

  const head = <Head>  <title>用户主页</title></Head>
  const tableTitle = <Row className="py-5 text-center">  <h1>总之这里是主页，要显示提问列表</h1></Row>
  const tableContent = <Row className="py-5 text-center">
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
  const containWrapper = (content) => <Container>{content}</Container>
  const containedContent = containWrapper(<> {tableTitle}    {tableContent}</>)
  
  return <>
    {head}
    {containedContent}
  </>

}

UserIndex.customLayout = function customLayout(page) {
  return (
    <AdminLayout>{page}</AdminLayout>
  )
}