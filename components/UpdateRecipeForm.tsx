import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { Box, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteRecipe, updateRecipe } from "@/src/store/recipeSlice";
import { styled } from "@mui/system";
import Image from "next/image";
import {
  ButtonWrapper,
  DeleteButton,
  DescriptionTextArea,
  EmailInputWrapper,
  FieldWrapper,
  FormWrapper,
  IngredientsTextArea,
  InstructionTextArea,
  NameInputWrapper,
  SaveButton,
  TitleInputWrapper,
} from "./RecipeFormElements";
import RouteBack from "./RouteBack";
import InputField from "./inputs/InputField";
import TextAreaLabel from "./labels/TextAreaLabel";
import { Recipe } from "@/types/recipe";
import { AppDispatch } from "@/src/store/store";

interface UpdateRecipeFormProps {
  recipe: Recipe;
}

const OverlayContainer = styled("div")`
  position: relative;
  width: 464px;
  height: 379px;
  border-radius: 15px;
`;

export const UpdateRecipeForm = ({ recipe }: UpdateRecipeFormProps) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<Recipe>({
    defaultValues: recipe,
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: Recipe) => {
    try {
      dispatch(updateRecipe(data));
      router.push("/");
    } catch (error) {}
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteRecipe(recipe.title));
      router.push("/");
    } catch (error) {}
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", margin: "auto" }}
    >
      <FormWrapper>
        <div>
          <RouteBack />
          <OverlayContainer>
            <Image src={"/curry.jpeg"} alt={`Recipe image of `} fill />
          </OverlayContainer>
        </div>
        <FieldWrapper>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <NameInputWrapper>
                <InputLabel>Your Name</InputLabel>

                <InputField
                  inputProps={{
                    id: field.name,
                    ...field,
                  }}
                  isError={Boolean(formState.errors.name)}
                />
              </NameInputWrapper>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <EmailInputWrapper>
                <InputLabel>Email Address</InputLabel>
                <InputField
                  inputProps={{
                    id: field.name,
                    ...field,
                    type: "email",
                  }}
                  isError={Boolean(formState.errors.email)}
                />
              </EmailInputWrapper>
            )}
          />

          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TitleInputWrapper>
                <InputLabel>Title</InputLabel>
                <InputField
                  inputProps={{
                    id: field.name,
                    ...field,
                  }}
                  isError={Boolean(formState.errors.title)}
                />
              </TitleInputWrapper>
            )}
          />

          <Controller
            name="description"
            rules={{ required: "Description is required" }}
            control={control}
            render={({ field }) => (
              <>
                <TextAreaLabel>Description</TextAreaLabel>
                <DescriptionTextArea
                  inputProps={{
                    id: field.name,
                    ...field,
                  }}
                  isError={Boolean(formState.errors.description)}
                />
              </>
            )}
          />
          <Controller
            name="ingredients"
            control={control}
            rules={{ required: "Ingredients is required" }}
            render={({ field }) => (
              <>
                <TextAreaLabel>Ingredients</TextAreaLabel>
                <IngredientsTextArea
                  inputProps={{
                    id: field.name,
                    ...field,
                  }}
                  isError={Boolean(formState.errors.ingredients)}
                />
              </>
            )}
          />
          <Controller
            name="instructions"
            rules={{ required: "Instructions is required" }}
            control={control}
            render={({ field }) => (
              <>
                <TextAreaLabel>Instructions</TextAreaLabel>
                <InstructionTextArea
                  inputProps={{
                    id: field.name,
                    ...field,
                  }}
                  isError={Boolean(formState.errors.instructions)}
                />
              </>
            )}
          />

          <ButtonWrapper>
            <SaveButton type="submit" variant="contained" color="primary">
              Save
            </SaveButton>

            <DeleteButton
              onClick={handleDelete}
              variant="contained"
              color="primary"
            >
              Delete
            </DeleteButton>
          </ButtonWrapper>
        </FieldWrapper>
      </FormWrapper>
    </Box>
  );
};

export default UpdateRecipeForm;
