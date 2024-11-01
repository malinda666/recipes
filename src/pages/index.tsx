import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";
import AllRecipes from "@/components/views/AllRecipes";

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

export default function Home() {
  return (
    <Layout>
      <AllRecipes />
    </Layout>
  );
}
