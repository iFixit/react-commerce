import { GetServerSideProps } from 'next';

const MyComponent = () => {
   return <h1>Hello World!</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   if (context.query.myParam === 'two') {
      // only throw conditionally so that this page actually builds
      throw new Error("We don't like page two");
   }

   return { props: {} };
};

export default MyComponent;
