import React from 'react'; 
import Image from 'next/image';
import styles from './hero.module.css'; 


type Props = {}

const Hero = (props: Props) => {
  return (
    <section className={styles.hero}>
      <div className='container'>
        <div className={styles.image}>
          <Image
            src='/images/hero.jpg'
            alt='coding image for the hero section'
            height={300}
            width={300}
          />
        </div>
        <div className={styles.content}>
          <h1>Hi, I&apos;m Anas</h1>
          <p>
            I blog about web development - especially frontend frameworks like
            Nextjs
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero
