/* eslint-disable react/react-in-jsx-scope */
import type {NextPage} from 'next';
import Head from 'next/head';
import NavDrawer from '../components/NavDrawer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>FoodCoxt</title>
        <meta name="description" content="Earning more by saving more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <NavDrawer/>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
};

export default Home;
