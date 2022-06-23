import type { NextPage } from 'next'
import Head from 'next/head'
import Search from '../components/search';

const Home: NextPage = () => {
  return (
    <div className="main">
      <Head>
        <title>Github Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="body">
        <Search />
      </div>

    </div>
  )
}

export default Home
