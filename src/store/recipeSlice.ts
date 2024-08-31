import { Recipe } from "@/types/recipe";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface RecipeState {
  recipes: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      const response = await fetch("/recipes.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data as Recipe[];
    } catch (error) {
      throw new Error("Failed to fetch recipes");
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipe: Recipe) => {
    try {
      const response = await fetch("/api/recipe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.status === 500) {
        const { message } = await response.json();
        throw new Error(message);
      }
      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }
      const data = await response.json();
      return data as Recipe[];
    } catch (error: unknown) {
      const errorMessage = error as { message?: string };
      throw new Error(errorMessage.message);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe: Recipe) => {
    try {
      const response = await fetch("/api/recipe/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      return recipe;
    } catch (error) {
      throw new Error("Failed to update recipe");
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (title: string) => {
    try {
      const response = await fetch("/api/recipe/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      return title;
    } catch (error) {
      throw new Error("Failed to delete recipe");
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    status: "idle",
    createStatus: "idle",
    error: null,
  } as RecipeState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = state.recipes.find((r) => r.title === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        const requestPayload = action.payload as { message: string | null };
        state.status = "failed";
        state.error = requestPayload.message;
      })
      .addCase(createRecipe.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.error = null;
        state.recipes = action.payload;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.createStatus = "failed";

        state.error = action.error.message ?? null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (recipe) => recipe.title === action.payload.title
        );
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe.title !== action.payload
        );
      });
  },
});

export const { toggleFavorite, resetCreateStatus } = recipeSlice.actions;

export default recipeSlice.reducer;
