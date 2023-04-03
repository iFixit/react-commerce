import { withSentry } from '@helpers/next-helpers';
import { GetServerSideProps } from 'next';

const MyComponent = () => {
   return <h1>Hello World!</h1>;
};

export const getServerSideProps: GetServerSideProps = withSentry(
   async (context) => {
      if (context.query.myParam === 'two') {
         // only throw conditionally so that this page actually builds
         Promise.reject(new Error("We don't like page two"));
      }

      return { props: {} };
   }
);

export default MyComponent;
