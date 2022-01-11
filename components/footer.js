import Image from 'next/image'
import styles from '../styles/footer.module.css'

export default function Footer() {
  return(
    <>
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <p>Built with ♥ by{' '}
            <a href="https://github.com/miriko-channel" target="_blank" rel="noopener noreferrer">Miriko Channel</a>.
             Open source on{' '}
             <a href="https://github.com/miriko-channel/miriko.live">GitHub</a>.
          </p>
        </div>
        <div className={styles.footerRow}>
          Powered by {' '}
          <a
            href="https://vercel.com?utm_source=miriko-ch&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer">
            ▲Vercel
          </a>.
        </div>
      </footer>
    </>
  )
}