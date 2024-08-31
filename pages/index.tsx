import Head from "next/head";
import RecipeCardList from "@/components/RecipeCardList";
import FilterColumn from "@/components/FilterColumn";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import useGetInitialRecipe from "@/hooks/use-get-initial-recipe";
import { styled } from "@mui/material";
import { RootState } from "@/src/store/store";

const Main = styled("main")`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  flex: 1;
  padding: 47px 55px 47px 81px;
  gap: 50px;
  height: 100%;
  background: #ebebeb;
`;
export default function Home() {
  useGetInitialRecipe();
  const { recipes, status } = useSelector<RootState>(
    (state) => state.recipeSlice
  ) as RootState["recipeSlice"];

  const [showFavorites, setShowFavorites] = useState(false);

  const getFavorites = useCallback(() => {
    return showFavorites
      ? recipes.filter((recipe) => recipe.isFavorite)
      : recipes;
  }, [recipes, showFavorites]);

  const favoriteRecipes = getFavorites();

  const handleShowFavorites = (isTrue: boolean) => {
    setShowFavorites(isTrue);
  };
  const isEmpty = recipes.length === 0;

  return (
    <>
      <Head>
        <title>SB app</title>
        <meta name="description" content="SB app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {["loading", "idle"].includes(status) ? (
        <>Loading ...</>
      ) : (
        <Main>
          <FilterColumn
            isEmpty={isEmpty}
            handleShowFavorites={handleShowFavorites}
          />
          <RecipeCardList recipes={favoriteRecipes} isEmpty={isEmpty} />
        </Main>
      )}
    </>
  );
}
