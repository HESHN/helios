import { withSSRContext } from 'aws-amplify'

function Dashboard({ username }) {
  return <h1>Hello {username} from SSR route!</h1>
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: {
        authenticated: true,
        username: user.username
      }
    }
  } catch (err) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }
  return {props: {}}
}

export default Dashboard