import { useDispatch } from "react-redux";
import { toggleFavorite } from "../src/store/recipeSlice";
import type { AppDispatch } from "../src/store/store";
import { Divider, Typography, Fab } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { Recipe } from "@/types/recipe";
import { AddIcon } from "@/src/assets";

const RecipeList = styled("ul")`
  max-width: 948px;
  padding: 49px 27px 14px 40px;
  list-style: none;
  margin: 0;
  border: 1px;
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 15px;
  background: white;
  overflow: auto;
  max-height: 834px;
  width: 100%;
  li {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }
  :empty {
    display: none;
  }
`;

const EmptyList = styled("div")`
  max-width: 948px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px;
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 15px;
  background: white;
  overflow: auto;
`;

const RecipeDivider = styled(Divider)`
  margin: 0 0 24px;
  height: 1px;
  width: 100%;
  border-color: #435490;
`;

const EmptyMessage = styled(Typography)`
  width: 100%;
  text-align: center;
  font-size: 49px;
  font-weight: 600;
  line-height: 59.3px;
`;

const FloatingButton = styled(Fab)`
  position: fixed;
  right: 200px;
  z-index: 1000;
  width: 71px;
  height: 71px;
  top: 167px;
`;

const RecipeCardList = ({
  recipes,
  isEmpty,
}: {
  recipes: Recipe[];
  isEmpty: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const handleToggleFavorite = (title: string) => () =>
    dispatch(toggleFavorite(title));
  const handleAddRecipe = () => {
    router.push("/recipe/create");
  };

  if (isEmpty) {
    return (
      <EmptyList>
        <EmptyMessage>No Record Found!</EmptyMessage>
      </EmptyList>
    );
  }
  return (
    <RecipeList>
      {recipes.length > 0 && (
        <FloatingButton
          onClick={handleAddRecipe}
          color="primary"
          aria-label="add"
        >
          <AddIcon aria-hidden />
        </FloatingButton>
      )}
      {recipes.map((recipe) => (
        <li key={recipe.title}>
          <RecipeCard
            recipe={recipe}
            onToggleFavorite={handleToggleFavorite(recipe.title)}
          />
          <RecipeDivider />
        </li>
      ))}
    </RecipeList>
  );
};

export default RecipeCardList;
