import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const hometabs = [
  {
    name: "Home",
    type: "all",
    content: <div>all recipes</div>,
  },
  {
    name: "Favourite",
    type: "fav",
    content: <div>favourite recipes</div>,
  },
];

export default function Home({ session }: Props) {
  console.log(session);
  return (
    <Layout>
      <div className="container mx-auto">
        <Tabs defaultValue={hometabs[0].name}>
          <TabsList>
            {hometabs.map((tab) => (
              <TabsTrigger value={tab.name} key={tab.type}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {hometabs.map((tab) => (
            <TabsContent value={tab.name} key={tab.type}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
