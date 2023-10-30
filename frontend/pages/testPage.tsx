import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
   if (context.query.myParam === 'two') {
      // only throw conditionally so that this page actually builds
      // eslint-disable-next-line
      await Promise.reject(new Error("We don't like page two! with await"));
   }

   return { props: {} };
};

function MyComponent() {
   return <h1>Hello World!</h1>;
}
export default MyComponent;
