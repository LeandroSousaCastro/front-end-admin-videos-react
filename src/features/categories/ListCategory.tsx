import { Box, Button } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";

export const ListCategory = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const [search, setSearch] = useState("");
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoriesMutation();
  const { enqueueSnackbar } = useSnackbar();
  const options = { perPage, search, page };
  const { data, isFetching, error } = useGetCategoriesQuery(options);

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }

  function handleOnPageSizeChange(pageSize: number) {
    setPerPage(pageSize);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      setSearch(search);
    }
  }

  async function handleDelete(id: string) {
    await deleteCategory({ id });
    enqueueSnackbar("Success delete category", { variant: "success" });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar(`Category deleted`, { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar(`Category deleted`, { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDelete}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
