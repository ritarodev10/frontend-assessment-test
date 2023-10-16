import type { NextPage, GetServerSideProps } from 'next';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return <div className={styles.container}></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.writeHead(302, { Location: '/dashboard/planets' });
  context.res.end();

  return { props: {} };
};

export default Home;
