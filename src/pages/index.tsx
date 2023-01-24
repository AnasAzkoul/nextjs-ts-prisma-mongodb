import Hero from '@/components/home-page/Hero/Hero';
import FeaturedPosts from '@/components/home-page/featured-posts/FeaturedPosts';
import styles from '@/styles/Home.module.css';
import type { PostDataTypes } from '@/Utils/post-utils';
import { getFeaturedPosts } from '@/Utils/post-utils';
import { GetStaticProps } from 'next';

type Props = {
  featuredPosts: PostDataTypes[];
};

export default function Home({ featuredPosts }: Props) {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <FeaturedPosts posts={featuredPosts} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts,
    },
    revalidate: 1800,
  };
};
