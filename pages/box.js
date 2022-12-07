import Head from "next/head";
import Script from 'next/script'

import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Collapse } from "react-bootstrap";
import { Circle } from "react-circle";
import styles from "../styles/box.module.css";

export default function Box() {
  const [text, setText] = useState('');
  const [buttonText, setButtonText] = useState("提交棉花糖");
  const [processing, setProcessing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertContent, setAlertContent] = useState('');
  const max_len = 1000;

  useEffect(() => {
    setButtonText(() => {
      if (processing) return "正在提交...";
      return "提交棉花糖";
    });
    setAlertOpen(a => {
      if (processing) return false;
      return a;
    })
  }, [processing]);

  function showAlert(content, type, timeout = 0) {
    setAlertContent(content);
    setAlertType(type);
    if (timeout != 0) {
      setTimeout(() => setAlertOpen(false), timeout);
    }
    setAlertOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit: ' + text);
    setProcessing(true);
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit_candy" })
          .then(async (token) => {
            try {
              const response = await fetch('/api/questions/item', {
                method: "PUT",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                  owner: '61dd92d865764aa2c3060134',
                  content: text.trim(),
                  recaptcha: token
                })
              });
              if (response) {
                const create_data = await response.json();
                console.log(create_data);
                if (create_data.result == 'success') {
                  setText('');
                  showAlert('提交成功！', 'success');
                } else if (create_data.result == 'recaptcha_fail') {
                  showAlert('提交失败了：\nreCAPTCHA验证失败，请不要搞事，谢谢', 'warning');
                } else {
                  showAlert('提交失败了：\n' + JSON.stringify(create_data.result), 'warning');
                }
              } else {
                throw new Error(response.statusText);
              }
            } catch (err) {
              showAlert('提交失败了：\n' + err.message, 'danger');
            }
            setProcessing(false);
          })
          .catch((err) => {
            showAlert('提交失败了：\n' + err.message, 'danger');
            setProcessing(false);
          });

      });
    } else {
      showAlert('无法连接到reCAPTCHA服务，请尝试联系网站管理员', 'warning');
      setProcessing(false);
    }

  };

  return (
    <>
      <Head>
        <title>海离的提问箱</title>
      </Head>
      <Script src={`https://www.recaptcha.net/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
      <Container className="py-5" as="header">
        <Row className="py-lg-5">
          <Col lg={8} md={10} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="content">
                <Row className="py-2">
                  <Col className={styles.hint}>
                    <Form.Label className={styles.hintText}>在此处填写想匿名和我说的话</Form.Label>
                  </Col>
                  {text.length != 0 &&
                    <Col className={styles.counter} xs="auto" md="auto" lg="auto" >
                      <Circle className={styles.progress} progress={text.length != 0 ? Math.max((text.length / max_len) * 100, 5) : 0} size="20" lineWidth="64" showPercentage={false} />
                      <span className={styles.remain}>{max_len - text.length}</span>
                    </Col>
                  }
                </Row>
                <Form.Control as="textarea"
                  rows={5} maxLength={max_len}
                  placeholder="初见 可爱 单推"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
              </Form.Group>
              <div className="text-center py-2">
                <Button id="submitButton"
                  variant="primary" type="submit"
                  className="text-center"
                  disabled={processing || text.trim().length == 0}>
                  {buttonText}
                </Button>
              </div>
            </Form>
            <Collapse in={alertOpen} className="py-1">
              <div>
                <Alert variant={alertType}>
                  {alertContent}
                </Alert>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  )
};