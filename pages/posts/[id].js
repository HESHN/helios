import { withSSRContext } from 'aws-amplify'
import { Movie } from '../../src/models'
import Markdown from 'react-markdown'
import { useRouter } from 'next/router'

export default function MovieComponent({ Movie }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>{Movie.title}</h1>
      <Markdown children={Movie.content} />
    </div>
  )
}

export async function getStaticPaths(req) {
  const { DataStore } = withSSRContext(req)
  const Movies = await DataStore.query(Movie)
  const paths = Movies.map(Movie => ({ params: { id: Movie.id }}))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps (req) {
  const { DataStore } = withSSRContext(req)
  const { params } = req
  const { id } = params
  const Movie = await DataStore.query(Movie, id)

  return {
    props: {
      Movie: JSON.parse(JSON.stringify(Movie))
    },
    revalidate: 1
  }
}