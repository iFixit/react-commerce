import { useRouter } from 'next/router';

export default function Wiki() {
   // fetch param from dynamic next route
   const { wikiname } = useRouter().query;
   return <div>Wiki {wikiname}</div>;
}
