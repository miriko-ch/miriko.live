import Head from "next/head";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Circle } from "react-circle";

export default function Box() {
  const [text, setText] = useState('');
  const max_len = 1000;

  return (
    <>
      <Head>
        <title>海离的提问箱</title>
      </Head>
      <Container className="py-5" as="header">
        <Row className="py-lg-5">
          <Col lg={8} md={10} className="mx-auto">
            <Form>
              <Form.Group className="mb-3" controlId="content">
                <Row>
                  <Col>
                    <Form.Label>在此处填写想匿名和我说的话</Form.Label>
                  </Col>
                  { text.length != 0 &&
                    <Col xs="auto" md="auto" lg="auto" style={ {textAlign: "right"} }>{' '}
                      <Circle progress={ text.length != 0 ? Math.max((text.length / max_len) * 100, 5) : 0 } size="20" lineWidth="64" showPercentage={false} />
                      <span style={{color: "darkgray"}}>{' '}{ max_len - text.length}</span>
                    </Col>
                  }
                </Row>
                <Form.Control as="textarea" 
                              rows={5} maxLength={max_len} 
                              onChange={(e) => setText(e.target.value)}
                              placeholder="初见 可爱 单推 结婚"/>
              </Form.Group>
              <div className="text-center py-2">
                <Button variant="primary" type="submit" className="text-center">
                  提交棉花糖
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
