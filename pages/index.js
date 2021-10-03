import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '../src/models'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
    async function fetchPosts() {
      const postData = await DataStore.query(Post)
      setPosts(postData)
    }
    DataStore.observe(Post).subscribe(() => fetchPosts())
  }, [])


  
  // return (
  //   <div className={styles.container}>
  //     <h1>Posts</h1>
  //     {
  //       posts.map(post => (
  //         <Link href={`/posts/${post.id}`}>
  //           <a>
  //             <h2>{post.title}</h2>
  //           </a>
  //         </Link>
  //       ))
  //     }
  //   </div>
  // )

  return (
		<Box sx={{ width: "100%", maxWidth: 500 }}>
			<Typography variant="h1" component="div" gutterBottom>
				Posts
			</Typography>

			{posts.map((post) => (
				<Link href={`/posts/${post.id}`}>
					<a>
						<Typography variant="h2" gutterBottom component="div">
							{post.title}
						</Typography>
					</a>
				</Link>
			))}
		</Box>
	);

}
