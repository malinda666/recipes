import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, Link2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

const RecipeGrid = ({ isLoading, data }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {isLoading ? (
        <div>Loading data...</div>
      ) : data.length ? (
        data.map((recipe, index) => <Recipe key={index} recipe={recipe} />)
      ) : null}
    </div>
  );
};

type RecipeProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recipe: any;
};

const Recipe = ({ recipe }: RecipeProps) => {
  const [open, setOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({
    strMeal: "",
    strArea: "",
    strCategory: "",
    strInstructions: "",
    strSource: "",
    strYoutube: "",
  });

  const openDetails = () => {
    setOpen(true);
    getSingleRecipe();
  };

  const getSingleRecipe = async () => {
    setDetailsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/recipes/single?name=${recipe.strMeal}`
      );
      console.log(data[0]);
      setRecipeDetails(data[0]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    } finally {
      setDetailsLoading(false);
    }
  };
  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white bg-opacity-70">
          {detailsLoading ? (
            <span>Loading data...</span>
          ) : (
            <Card className="max-w-max m-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <CardTitle>{recipeDetails?.strMeal}</CardTitle>
                    <CardDescription>
                      <div className="flex gap-1 my-2">
                        <Badge>{recipeDetails?.strArea}</Badge>
                        <Badge variant="secondary">
                          {recipeDetails?.strCategory}
                        </Badge>
                      </div>
                    </CardDescription>
                  </div>
                  <Button onClick={() => setOpen(false)}>
                    <X />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipeDetails.strInstructions}</p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 items-center">
                  {recipeDetails.strSource ? (
                    <Link
                      href={recipeDetails.strSource}
                      target="blank"
                      className="underline flex items-center gap-1"
                    >
                      Source <Link2 />
                    </Link>
                  ) : null}
                  {recipeDetails.strYoutube ? (
                    <Link
                      href={recipeDetails.strYoutube}
                      target="blank"
                      className="underline flex items-center gap-1"
                    >
                      YouTube <Link2 />
                    </Link>
                  ) : null}
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      ) : null}
      <Card className="overflow-hidden cursor-pointer group">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={recipe.strMealThumb}
              alt="Chicken Noodle Soup"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-150 ease-in-out"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Soups</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Add to favorites"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-medium text-nowrap truncate mb-4">
              {recipe.strMeal}
            </h3>
            <Button onClick={openDetails}>View More</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeGrid;
