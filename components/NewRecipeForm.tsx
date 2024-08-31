import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

interface FormData {
  name: string;
  email: string;
  title: string;
  instructions: string;
  image: FileList;
}

const NewRecipeForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to check if title is unique
      // TODO: Implement image upload logic
      // TODO: Save recipe data to backend
      console.log("Form data:", data);
      setSnackbar({
        open: true,
        message: "Recipe added successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error adding recipe. Please try again.",
        severity: "error",
      });
    }
    setIsSubmitting(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, margin: "auto" }}
    >
      <Typography variant="h4" gutterBottom>
        New Recipe
      </Typography>

      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email Address"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="instructions"
        control={control}
        rules={{ required: "Instructions are required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Instructions"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.instructions}
            helperText={errors.instructions?.message}
          />
        )}
      />

      <Controller
        name="image"
        control={control}
        rules={{ required: "Image is required" }}
        render={({ field: { onChange, ...field } }) => (
          <TextField
            {...field}
            type="file"
            onChange={(e) => onChange((e.target as HTMLInputElement).files)}
            inputProps={{ accept: "image/*" }}
            fullWidth
            margin="normal"
            error={!!errors.image}
            helperText={errors.image?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewRecipeForm;
