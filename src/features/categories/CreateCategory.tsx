import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CreateCategory = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  });
  const handleChange = () => {};
  const handleToggle = () => {};

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h3" component="h1">
              Create Category
            </Typography>
          </Box>
          <CategoryForm
            category={category}
            isDisabled={isDisabled}
            isLoading={false}
            onSubmit={() => {}}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
};
