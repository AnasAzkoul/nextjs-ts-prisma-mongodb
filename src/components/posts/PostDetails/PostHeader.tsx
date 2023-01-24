import React from 'react'; 
import Image from 'next/legacy/image';
import styles from './postHeader.module.css'; 

type Props = {
  title: string
  image: string
}

const PostHeader = ({title, image}: Props) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.image}>
        <Image src={image} alt={title} width={500} height={500} layout='intrinsic'/> 
      </div>
    </header>
  )
}

export default PostHeader
