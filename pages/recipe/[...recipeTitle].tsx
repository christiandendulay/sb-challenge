import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UpdateRecipeForm from "../../components/UpdateRecipeForm";
import { RootState } from "@/src/store/store";
import useGetInitialRecipe from "@/hooks/use-get-initial-recipe";

const RecipePage = () => {
  useGetInitialRecipe();
  const router = useRouter();
  const { recipeTitle } = router.query;
  const title = Array.isArray(recipeTitle) ? recipeTitle[0] : recipeTitle;

  const { recipes, status } = useSelector(
    (state: RootState) => state.recipeSlice
  );
  console.log({ recipes });

  if (status === "loading") {
    return <div>Loading....</div>;
  }
  const recipe = recipes?.find((recipe) => recipe.title === title);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <UpdateRecipeForm recipe={recipe} />
    </div>
  );
};

export default RecipePage;
