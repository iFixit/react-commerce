export function getServerSideProps() {
   return { props: { name: 'World' } };
}

type CommunityPageProps = {
   name: string;
};

function CommunityPage({ name }: CommunityPageProps) {
   return <p>Hello {name}</p>;
}

export default CommunityPage;
