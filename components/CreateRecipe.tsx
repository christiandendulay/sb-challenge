import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { Box, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "@/src/store/recipeSlice";
import { styled } from "@mui/system";
import Image from "next/image";
import InputField from "./inputs/InputField";
import {
  ButtonWrapper,
  DescriptionTextArea,
  EmailInputWrapper,
  FormWrapper,
  IngredientsTextArea,
  InstructionTextArea,
  NameInputWrapper,
  SaveButton,
  TitleInputWrapper,
  FieldWrapper,
} from "./RecipeFormElements";
import InputLabel from "./labels/InputLabel";
import TextAreaLabel from "./labels/TextAreaLabel";
import RouteBack from "./RouteBack";
import { RootState, AppDispatch } from "@/src/store/store";
import { Recipe } from "@/types/recipe";

const OverlayContainer = styled("div")`
  position: relative;
  width: 464px;
  height: 379px;
  border-radius: 15px;
`;
const FileInput = styled("input")`
  display: none;
`;
const CreateRecipe = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { createStatus, error } = useSelector<RootState>(
    (state) => state.recipeSlice
  ) as RootState["recipeSlice"];

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [__file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (createStatus === "failed") {
      setSnackbarOpen(true);
    }
  }, [createStatus]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      router.push("/");
    }
  }, [createStatus, router]);

  const { control, handleSubmit, formState } = useForm<Omit<Recipe, "image">>({
    defaultValues: {
      name: "",
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      email: "",
      isFavorite: false,
    },
  });

  const onSubmit = async (data: Omit<Recipe, "image">) => {
    //if (file) {
    //   try {
    //     const formData = new FormData();
    //     formData.set("file", file);
    //     console.log({ formData });
    //     const response = await fetch(`/api/recipe/upload?title=${data.title}`, {
    //       method: "POST",
    //       body: formData,
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to upload image");
    //     }

    //     const jsonData = await response.json();
    //     const imagePath = jsonData.imagePath;

    dispatch(
      createRecipe({
        ...data,
        image: "",
        dateCreated: new Date().toString(),
      })
    );

    //   } catch (err) {
    //     console.error(err);
    //     setSnackbarOpen(true);
    //   }
    // }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleImageOnclick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      return;
    }

    setFile(null);
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
            <Image
              src={"/placeholder.png"}
              alt={"placeholder image"}
              fill
              onClick={handleImageOnclick}
            />
          </OverlayContainer>

          <FileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
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
          </ButtonWrapper>
        </FieldWrapper>
      </FormWrapper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error ?? "File error"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateRecipe;
