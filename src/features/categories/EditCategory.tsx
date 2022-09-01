import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const EditCategory = () => {
  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = () => {};
  const handleToggle = () => {};

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h3" component="h1">
              Edit Category
            </Typography>
          </Box>
        </Box>
        <CategoryForm
          category={category}
          isDisabled={isDisabled}
          isLoading={false}
          onSubmit={() => {}}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
