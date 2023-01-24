import React from 'react'; 
import Posts from '@/components/posts';
import styles from './featuredPosts.module.css'; 
import type { PostDataTypes } from '@/Utils/post-utils';

type Props = {
  posts: PostDataTypes[]
}

const FeaturedPosts = ({posts}: Props) => {
  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <h2 className='section-title'>Featured Posts</h2>
        <Posts posts={posts} />
      </div>
    </section>
  );
}

export default FeaturedPosts
