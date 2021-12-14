import { withSSRContext } from 'aws-amplify'
import type { NextApiRequest, NextApiResponse } from 'next'
import React, { FunctionComponent } from 'react'

type Props = {
  authenticated:boolean,
  username:string
}

const Dashboard: FunctionComponent<Props> = ({ username }) => {
  return <h1>Hello {username} from SSR route!</h1>
}

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
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