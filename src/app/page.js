// "use client"

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
// import HydrationTest from '@/components/hydrationTest'
// import dynamic from 'next/dynamic'
// const HyderationTestNoSSR = dynamic(() => import("@/components/hydrationTest"), { ssr: false })

const Home = () => {
  // const a =Math.random();
  // console.log(a)
  // console.log("let's check where this works");
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        {/* <HyderationTestNoSSR /> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus suscipit modi recusandae, maxime architecto rem ex corrupti molestiae aliquam autem laudantium sint? Rerum est, ratione iusto soluta inventore sit hic?
        </p>
        <div className={styles.buttons}>
          <Link href={"/about"} className={styles.button}>Learn More</Link>
          <Link href={"/contact"} className={styles.button}>Contact</Link>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt='' fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/hero.gif" alt='' fill className={styles.heroImg} unoptimized />
      </div>
    </div>
  )
}

export default Home