import { GetServerSideProps } from 'next';

const Dashboard = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.writeHead(302, { Location: '/dashboard/planets' });
  context.res.end();

  return { props: {} };
};

export default Dashboard;
