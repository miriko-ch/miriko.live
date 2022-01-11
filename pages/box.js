import Head from "next/head";
import Script from 'next/script'

import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Circle } from "react-circle";
import styles from "../styles/box.module.css";

export default function Box() {
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState("REGISTER");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState({});
  const max_len = 1000;

  useEffect(() => {
    setSubmit(() => {
      if (completed) return "RESET";
      if (processing) return "PROCESSING";
      return "REGISTER";
    });
  }, [processing, completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit: ' + text);
    if (completed) {
      setCompleted(false);
      setText('');
      setResult({});
    } else {
      setProcessing(true);
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
          .then(async (token) => {
            /* send data to the server */
            const body = {
              recaptcha_token: token
            };
            try {
              const response = await fetch('/api/recaptcha', {
                method: "POST",
                headers: { "Content-Type": "application/json;chaset=utf-8" },
                body: JSON.stringify(body)
              });
              if (response.ok) {
                const json = await response.json();
                setResult(json);
                setCompleted(true);
              } else {
                throw new Error(response.statusText);
              }
            } catch (err) {
              setResult({ message: err.message });
            }
          })
          .catch((err) => {
            setResult({ message: err.message });
          });
        setProcessing(false);
      });
    }
  };

  return (
    <>
      <Head>
        <title>海离的提问箱</title>
      </Head>
      <Script strategy="beforeInteractive" src={`https://www.recaptcha.net/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
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
                  placeholder="初见 可爱 单推 结婚"
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
              <div className="text-center py-2">

                <Button id="submitButton"
                  variant="primary" type="submit"
                  className="text-center">
                  提交棉花糖
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <div>
            { JSON.stringify(result, undefined, 2) }
          </div>
        </Row>
      </Container>
    </>
  )
};