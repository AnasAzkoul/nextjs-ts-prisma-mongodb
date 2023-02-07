import React from 'react';
import Image from 'next/legacy/image';
import PostHeader from './PostHeader';
import styles from './postContent.module.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import type { PostDataTypes } from '@/Utils/post-utils';
import { PrismLight } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

type Props = {
  post: PostDataTypes;
};

PrismLight.registerLanguage('js', js);
PrismLight.registerLanguage('css', css);

function PostContent({ post }: Props) {
  const customRenderers = {
    img(image: any) {
      return (
        <Image
          src={image.src}
          alt={image.alt}
          width={600}
          height={300}
          layout='intrinsic'
        />
      );
    },
    // p(paragraph: any) {
    //   const {node} = paragraph;

    //   if (node.children[0].tagName === 'img') {
    //     const image = node.children[0];

    //     return (
    //       <div className={styles.image}>
    //         <Image
    //           src={image.properties.src}
    //           alt={image.alt}
    //           width={600}
    //           height={300}
    //         />
    //       </div>
    //     );
    //   }
    // },

    code(code: any) {
      const { className, children } = code;
      const language = className.split('-')[1];

      return (
        <PrismLight language={language} style={atomDark}>
          {children}
        </PrismLight>
      );
    },
  };

  return (
    <article className={styles.article}>
      <PostHeader title={post.title} image={post.image} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
