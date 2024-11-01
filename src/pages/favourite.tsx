import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import RecipeGrid from "@/components/shared/RecipeGrid";

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

export default function Favourites({ session }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipes, setRecipes] = useState<any[]>([]);

  const [isLoading, setLoading] = useState(false);

  const getFavouriteRecipes = async (user_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/recipes/favourites?id=${user_id}`);
      setRecipes(data);
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavouriteRecipes(session.user.id);
  }, [session]);

  return (
    <Layout>
      <div className="my-6">
        <RecipeGrid data={recipes} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
