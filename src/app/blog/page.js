import PostCard from '@/components/postCard/postCard'
import styles from './blog.module.css'
import { getPosts } from '@/lib/data'

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog`, { next: { revalidate: 3600 } }); // next js will by default store data in cache, to prevent this, we use no store
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

const BlogPage = async () => {

  // FETCH DATA WITH AN API
  const posts = await getData();

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {
        posts.map((post) =>
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>)
      }
    </div>
  )
}

export default BlogPage