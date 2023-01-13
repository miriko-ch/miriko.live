import Head from "next/head";
import Script from 'next/script'
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Collapse } from "react-bootstrap";
import { Circle } from "react-circle";
import styles from "../styles/box.module.css";
import _ from 'lodash';

export default function Box() {
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertContent, setAlertContent] = useState('');
  const maxLength = 1000;

  useEffect(() => { processing && setAlertOpen(false) }, [processing]);

  const showAlert = (content, type, timeout = 0) => {
    setAlertContent(content);
    setAlertType(type);
    timeout && setTimeout(() => setAlertOpen(false), timeout);
    setAlertOpen(true);
  }

  const getToken = async () => grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit_candy" })

  const submitCandy = async () => {
    const token = await getToken()
    const body = JSON.stringify({
      owner: '61dd92d865764aa2c3060134',
      content: text.trim(),
      recaptcha: token
    })
    const response = await fetch('/api/questions/item', {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body
    });
    const create_data = await response.json();

    const submitSucceeded = () => { setProcessing(false); setText(''); showAlert('提交成功！', 'success') }
    const submitFailed = () => { setProcessing(false); showAlert('提交失败了：\n' + JSON.stringify(create_data.result), 'warning') }
    const recaptchaFailed = () => { setProcessing(false); showAlert('提交失败了：\nreCAPTCHA验证失败，请不要搞事，谢谢', 'warning') }

    if (!response.ok) { submitFailed(); return }

    const result = _.get(create_data, 'result')
    const afterSubmitFunc = {
      'success': submitSucceeded,
      'recaptcha_fail': recaptchaFailed
    }[result] || submitFailed
    afterSubmitFunc && afterSubmitFunc()
  }

  const trySubmitCandy = async () => {
    try {
      await submitCandy()
    } catch (err) {
      showAlert('提交失败了：\n' + err.message, 'danger');
      setProcessing(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit: ' + text);
    const { grecaptcha } = window
    if (_.isEmpty(grecaptcha)) { showAlert('无法连接到reCAPTCHA服务，请尝试联系网站管理员', 'warning'); return }
    setProcessing(true);
    grecaptcha.ready(trySubmitCandy)

  };

  const head = <Head><title>海离的提问箱</title></Head>

  const subTitle = <Col className={styles.hint}><Form.Label className={styles.hintText}>在此处填写想匿名和我说的话</Form.Label></Col>
  const textLengthCircle = !_.isEmpty(text) && <Col className={styles.counter} xs="auto" md="auto" lg="auto" >
    <Circle
      className={styles.progress}
      progress={Math.max((_.size(text) / maxLength) * 100, 5)}
      size="20"
      lineWidth="64"
      showPercentage={false}
    />
    <span className={styles.remain}>{maxLength - _.size(text)}</span>
  </Col>
  const subHead = <Row className="py-2">
    {subTitle}
    {textLengthCircle}
  </Row>
  const textArea = <Form.Control as="textarea"
    rows={5}
    maxLength={maxLength}
    placeholder="初见 可爱 单推"
    onChange={(e) => setText(e.target.value)}
    value={text}
  />
  const submitButton = <Button
    id="submitButton"
    variant="primary"
    type="submit"
    className="text-center"
    disabled={processing || _.isEmpty(text.trim())} >
    {processing ? '正在提交...' : '提交棉花糖'}
  </Button>
  const form = <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="content">
      {subHead}
      {textArea}
    </Form.Group>
    <div className="text-center py-2">
      {submitButton}
    </div>
  </Form >

  const collapse = <Collapse in={alertOpen} className="py-1">
    <div><Alert variant={alertType}>{alertContent}</Alert></div>
  </Collapse>

  const mainContent = <Row className="py-lg-5">
    <Col lg={8} md={10} className="mx-auto">
      {form}
      {collapse}
    </Col>
  </Row>

  const containWrapper = (content) => <Container className="py-5" as="header">{content}</Container>
  return <>
    {head}
    <Script src={`https://www.recaptcha.net/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
    {containWrapper(mainContent)}
  </>

};