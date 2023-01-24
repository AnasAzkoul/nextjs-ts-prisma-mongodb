import React from 'react';
import { GetStaticProps} from 'next';
import Posts from '@/components/posts';
import {PostDataTypes} from '@/Utils/post-utils';
import { getAllPosts } from '@/Utils/post-utils';

import styles from '../../styles/allPosts.module.css'; 

type Props = {
  posts: PostDataTypes[]
};

const AllPostsPage = ({posts}: Props) => {
  return (
    <section className={styles.allPosts}>
      <h1>All Posts</h1>
      <Posts posts={posts}/>
    </section>
  );
};

export default AllPostsPage;


export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(); 
  
  return {
    props: {
      posts
    }
  }
}
