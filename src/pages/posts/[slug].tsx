import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import PostContent from '@/components/posts/PostDetails/PostContent';
import { getAllPosts } from '@/Utils/post-utils';
import type {PostDataTypes} from '@/Utils/post-utils';
import { useSession } from 'next-auth/react';

type Props = {
  post: PostDataTypes;
};

const SinglePostPage = ({ post }: Props) => {
  const session = useSession(); 
  
  if (session.status === 'loading') {
    return <h2>Loading...</h2>
  }
  
  if (session.status === 'unauthenticated') {
    return <h2>
      You need to sign in in order to view the post detail
      <Link href='/auth/signin'>Sign in</Link>
    </h2>
  }
  
  return <PostContent post={post} />;
};

export default SinglePostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const { slug } = context.params;
  const post = getAllPosts().find((post) => post.slug === slug);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsParams = getAllPosts()
    .map((post) => post.slug)
    .map((slug) => ({ params: { slug } }));

  return {
    paths: postsParams,
    fallback: false,
  };
};
