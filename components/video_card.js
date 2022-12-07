import styles from './styles/video_card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'

export default function VideoCard(props) {
  const V = props.v;
  return (
    <div className={styles.vcard}>
      <div className={styles.coverImage}>
        <img id={V.bvid} src={V.pic + "@600w"} alt={V.title} referrerPolicy='no-referrer'/>
      </div>
      <div className={styles.overlay}>
        <h3 className={styles.overlayTitle}>{V.title}</h3>
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  )
}