import { GetServerSideProps } from 'next';

const MyComponent = () => {
   return <h1>Hello World!</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   if (context.query.myParam === 'unhandled') {
      Promise.reject(new Error('This is an unhandled rejected promise'));
   } else if (context.query.myParam === 'handled') {
      return Promise.reject(new Error('This is a handled rejected promise'));
   }

   return { props: {} };
};

export default MyComponent;
