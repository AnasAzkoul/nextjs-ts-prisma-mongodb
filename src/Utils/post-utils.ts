import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

type PostMetaDataTypes = {
  title: string 
  image: string
  date: Date | string
  text: string
  isFeatured: boolean
};

export interface PostDataTypes extends PostMetaDataTypes {
  slug: string;
  content: string;
}

export function getPostData(filename: string) {
  const filePath = path.join(postsDirectory, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = filename.replace(/\.md$/, '');

  const postData: PostDataTypes = {
    slug: postSlug,
    ...(data as PostMetaDataTypes),
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory);

  return postFiles
    .map((postFile) => getPostData(postFile))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts() {
  const featuredPosts = getAllPosts().filter(post => post.isFeatured)
  return featuredPosts; 
}
