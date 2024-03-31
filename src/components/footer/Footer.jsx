import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        Lucky
      </div>
      <div className={styles.text}>
        Lucky creatives thoughts agency @ All rights reserves.
      </div>
    </div>
  )
}

export default Footer