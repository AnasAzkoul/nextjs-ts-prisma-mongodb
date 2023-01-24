import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import PostContent from '@/components/posts/PostDetails/PostContent';
import { getAllPosts } from '@/Utils/post-utils';
import type { PostDataTypes } from '@/Utils/post-utils';

type Props = {
  post: PostDataTypes;
};

const SinglePostPage = ({ post }: Props) => {
  const { query } = useRouter();

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
