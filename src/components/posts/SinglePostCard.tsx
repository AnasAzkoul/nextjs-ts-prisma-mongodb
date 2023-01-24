import React from 'react'; 
import Link from 'next/link';
import Image from 'next/legacy/image';
import type {Post} from '@/Utils/types';
import styles from './singlePost.module.css'
import type { PostDataTypes } from '@/Utils/post-utils';

type Props = {
  post: PostDataTypes;
};

const SinglePost = ({post}: Props) => {
  
  const postImage = `/images/posts/${post.slug}.png`;
  
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  })
  
  const excerptArr = post.text.split(' '); 
  const excerpt = excerptArr.slice(10, excerptArr.length).join(' '); 
  
  
  
  return (
    <li className={styles.post}>
      <Link href={`/posts/${post.slug}`}>
        <div className={styles.image}>
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={200}
            layout='responsive'
          />
        </div>
        <div className={styles.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p className='section-para'>{excerpt} ...</p>
        </div>
      </Link>
    </li>
  );
}

export default SinglePost
