import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import RecipeGrid from "@/components/shared/RecipeGrid";
import { cn } from "@/lib/utils";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipes, setRecipes] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);

  const [activeCategory, setActiveCategory] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getRecipes = async (category: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/recipes/list?category=${category}`
      );
      setRecipes(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const getCategories = async () => {
    toast("test");
    try {
      const { data } = await axios.get("/api/recipes/categories");
      const _categories = data.slice(0, 5);
      setCategories(_categories);
      setActiveCategory(_categories[0].strCategory);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) {
      return;
    }
    getRecipes(activeCategory);
    console.log(activeCategory);
  }, [activeCategory]);

  return (
    <Layout>
      <div className="my-6">
        <div className="flex flex-wrap gap-2 py-4">
          {categories.length
            ? categories.map((category) => (
                <button
                  key={category.idCategory}
                  onClick={() => setActiveCategory(category.strCategory)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                    "border border-pink-400 hover:bg-pink-50",
                    activeCategory === category.strCategory
                      ? "bg-pink-400 text-white"
                      : "text-pink-400 bg-transparent"
                  )}
                >
                  {category.strCategory}
                </button>
              ))
            : null}
        </div>
        <RecipeGrid data={recipes} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
