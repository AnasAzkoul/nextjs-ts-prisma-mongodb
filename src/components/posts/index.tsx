import React from 'react'; 
import SinglePost from './SinglePostCard';
import type { Post } from '@/Utils/types';
import styles from './posts.module.css'; 
import type { PostDataTypes } from '@/Utils/post-utils';

type Props = {
  posts: PostDataTypes[];
};

const Posts = ({posts}: Props) => {

  return (
    <ul className={styles.posts}>
      {posts.map(post => <SinglePost post={post} key={post.slug}/>)}
    </ul>
  )
}

export default Posts; 
