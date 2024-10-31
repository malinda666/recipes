import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session
        ? {
            ...session,
            user: {
              ...session.user,
              name: session.user.name || null,
              image: session.user.image || null,
            },
          }
        : null,
    },
  };
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
};

export default function Home({ session }: Props) {
  console.log(session);
  return (
    <Layout>
      <div className="container mx-auto">fav</div>
    </Layout>
  );
}
