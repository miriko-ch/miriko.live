import Head from 'next/head'
import Image from 'next/image'
import VideoCard from '../components/video_card'
import { useState, useEffect } from "react";

import styles from '../styles/home.module.css'

import { Button, Container, Row, Col, Carousel } from 'react-bootstrap'
import { Parallax } from 'react-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBilibili } from '@fortawesome/free-brands-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'

import AvatarImage from '../public/img/avatar.jpg'
import SquareLogo from '../public/img/square_logo.png'
import CharacterUniform from '../public/img/character/invisible_watermark_school_uniform.jpg'
import CharacterTechwear from '../public/img/character/invisible_watermark_techwear.jpg'

export default function Home() {
  const [accInfo, setAccInfo] = useState(null);
  const [isAccountLoading, setAccountLoading] = useState(false);
  const [videoList, setVideoList] = useState(null);
  const [isVideoLoading, setVideoLoading] = useState(false);
  useEffect(() => {
    setAccountLoading(true);
    fetch('/api/info')
      .then(res => res.json())
      .then(json => {
        setAccInfo(json);
        setAccountLoading(false);
      });

    setVideoLoading(true);
    fetch('/api/latest_updates')
      .then(res => res.json())
      .then(json => {
        setVideoList(json);
        setVideoLoading(false);
      })
  }, []);

  const VideoListItemsCount = 8;

  return (
    <>
      <Head>
        <title>海离Miriko</title>
      </Head>
      <Container className="py-5 text-center" as="header">
        <section id="head">
          <Parallax bgImage='/img/character/techwear_q.png' blur={10} strength={-300} contentClassName={styles.parallaxContent}>
            <Row className={"py-5 g-0" + styles.headContainer}>
              <Col lg={6} md={8} className="mx-auto">
                <Image src={AvatarImage} width={120} height={120}
                  className={styles.avatar} alt="Avatar" placeholder="blur" quality={90} />
                <h1 className="pt-2">海离Channel</h1>
                <div className="lead text-muted" id="p-sign">
                  <div className="center-container">
                    你好！我是个人势VUP
                    <Image src={SquareLogo} width={18} height={18} alt="Site Logo" />
                  </div>
                </div>
                <div className="pt-3">
                  <a href="https://space.bilibili.com/7564991" target="_blank" rel="noreferrer"
                    className="btn btn-outline-primary my-2">
                    <FontAwesomeIcon icon={faBilibili} />
                    {' '}Bilibili主页
                  </a>{' '}
                  <a href="https://www.acfun.cn/u/61330786" target="_blank" rel="noreferrer"
                    className="btn btn-outline-danger my-2">
                    <svg className={styles.acfunIcon} version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                      <g>
                        <path fill="#F54A58" d="M477.7,40.4L10,811.5l233.8,148l48.5-166.1l371-28l96.3,183.8L990,811.5L477.7,40.4z M382.2,616.8l88.5-195.1l99.7,195.1H382.2z" />
                      </g>
                    </svg>
                    {' '}AcFun主页
                  </a>{' '}
                  <a target="_blank" rel="noreferrer"
                    className={"btn my-2 " + (accInfo && (accInfo.bili.live || accInfo.acfun.live) ? "btn-outline-success" : "btn-outline-secondary")}
                    href={accInfo && accInfo.acfun.live ? 'https://live.acfun.cn/live/61330786' : 'https://live.bilibili.com/449047'}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                    {' '}{accInfo && (accInfo.bili.live || accInfo.acfun.live) ? '观看直播' : '当前未开播'}
                  </a>
                </div>
                <div className='py-1'>
                  {
                    isAccountLoading
                      ? <small className="text-muted">计算中...</small>
                      : !accInfo
                        ? <small className="text-muted">没有数据</small>
                        : <div>
                          <small className="text-muted">海离子现在共有{' '}
                            <span title="Bilibili">{accInfo.bili.followers}</span>{' + '}<span title="AcFun">{accInfo.acfun.followers}</span>
                            {' '}只</small>
                        </div>
                  }
                </div>
              </Col>
            </Row>
          </Parallax>
        </section>
        <section id="about" className="py-4">
          <h2>简介</h2>
          <small className="text-muted">Introduction</small>
          <Row className="py-2">
            <Col lg={6} className={styles.aboutContent + " mx-auto"}>
              <p>你好，这里是战斗系VUP海离，是隐藏于人类中的虚拟JK，也是传说中的执行者，不过正在沉迷游戏和看其他VUP（逃）。</p>
              <p>现在有两套Live2D形象，一套是日常的JK制服，一套是执行任务的机能风制服。背后背的<strong>不是空调</strong>！</p>
              <p>直播会偶尔打打游戏，主要玩战争雷霆（War Thunder）、战舰世界（World of Warships）等，周末有一定概率掉落杂谈回。直播时间一般是晚上，暂时没有固定的直播时间表，想播就播。</p>
              <p>视频投稿会不定期更新一些知识区科技区的内容，大多数跟计算机和数码相关，不过一切都在起步阶段更新频率未知，有空就会做视频。其实想做的方向很多，挖了很多坑<del>但是都没有填过</del>。</p>
              <ul className="">
                <li><span>生日</span>21 May</li>
                <li><span>坐标</span>Virtual Neptune</li>
                <li><span>擅长语言</span>C/C++(?)C#(??)</li>
                <li><span>喜欢的食物</span>辣椒 火锅</li>
                <li><span>喜好</span>吃饭睡觉打游戏看视频收钱花钱最后才是编程</li>
                <li><span>发色</span>白色</li>
                <li><span>瞳色</span>绿色</li>
              </ul>
            </Col>
            <Col xl={4} lg={5} className="">
              <Carousel variant="dark" className={styles.bodies} indicators={false}>
                <Carousel.Item>
                  {/* <div className={styles.Im} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}> */}
                  <Image className={styles.characterImage} src={CharacterUniform} alt="初始JK制服立绘" placeholder="blur" quality={100} />
                  {/* </div> */}
                  <div className={styles.frame} />
                </Carousel.Item>
                <Carousel.Item>
                  {/* <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}> */}
                  <Image className={styles.characterImage} src={CharacterTechwear} alt="机能风制服立绘" placeholder="blur" quality={100} />
                  {/* </div> */}
                  <div className={styles.frame} />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </section>
        <section id="videos">
          <h2>最新投稿</h2>
          <small className='text-muted'>Latest Updates</small>
          <Row className='pt-1 pb-2'>
            <p className={[styles.aboutContent, styles.textCenter].join(' ')}>喜欢海离的话就点一下关注吧^_^<br />希望大家看视频的时候可以多发弹幕&评论，这样就知道怎么改进啦！</p>
          </Row>
          {isVideoLoading ?
            <p>正在获取最新投稿...</p>
            : !videoList ?
              <p>没有数据</p>
              :
              <Row className={styles.textCenter}>
                {[...Array(VideoListItemsCount)].map((x, i) =>
                  <Col lg={3} md={5} sm={5} key={i}>
                    <VideoCard v={videoList[i]} />
                  </Col>
                )}
              </Row>
          }
          <Row>
            <a href="https://space.bilibili.com/7564991" target="_blank" rel="noreferrer"
              className={"btn btn-outline-primary mx-auto " + styles.moreVideoButton}>更多视频</a>
          </Row>

        </section>
      </Container>
    </>
  )
}
