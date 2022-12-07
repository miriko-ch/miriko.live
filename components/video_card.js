import styles from './styles/video_card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function VideoCard(props) {
  const V = props.v;
  const blurUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPY/AQAEWgIHIlNbAAAAAABJRU5ErkJggg==';
  return (
    <div className={styles.coverImageContainer}>
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <p className={styles.overlayTitle}>{V.title}</p>
          <a href={`https://www.bilibili.com/video/${V.bvid}`} target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLink} size='2x' className={styles.overlayLinkIcon}/></a>
        </div>
      </div>
      <Image className={styles.coverImage} id={V.bvid} src={V.pic + '@600w'} alt={V.title} height={0} width={0} sizes='100vw' placeholder='blur' blurDataURL={blurUrl} referrerPolicy='no-referrer' quality={100} />
    </div>
  )
}