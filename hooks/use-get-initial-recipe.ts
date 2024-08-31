import { fetchRecipes, resetCreateStatus } from "@/src/store/recipeSlice";
import { AppDispatch, RootState } from "@/src/store/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetInitialRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector<RootState>(
    (state) => state.recipeSlice
  ) as RootState["recipeSlice"];

  useEffect(() => {
    dispatch(resetCreateStatus());
  }, []);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);
};

export default useGetInitialRecipe;
