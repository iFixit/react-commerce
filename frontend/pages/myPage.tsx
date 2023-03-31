import { GetServerSideProps } from 'next';

const MyComponent = () => {
   return <h1>Hello World!</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   if (context.query.myParam === 'unhandled') {
      Promise.reject(new Error("We don't like page two"));
   } else if (context.query.myParam === 'handled') {
      return Promise.reject(new Error("We don't like page two"));
   }

   return { props: {} };
};

export default MyComponent;
