import Image from 'next/image'
import styles from './singlePost.module.css'
import PostUser from '@/components/postUser/postUser';
import { Suspense } from 'react';
import { getPost } from '@/lib/data';

// FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${slug}`, { next: { revalidate: 3600 } }); // next js will by default store data in cache, to prevent this, we use no store
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.desc
  }
}

const SinglePostPage = async ({ params, searchParams }) => {
  // console.log(params, searchParams);

  const { slug } = params;

  // FETCH DATA WITH AN API
  const post = await getData(slug);

  // FETCH DATA WITHOUT AN API
  // const post = await getPost(slug);
  // console.log("post", post);

  return (
    <div className={styles.container}>
      {post.img &&
        (<div className={styles.imgContainer}>
          <Image
            src={post.img}
            alt=''
            fill
            className={styles.img}
          />
        </div>)}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(0, 10)}</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.desc}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage