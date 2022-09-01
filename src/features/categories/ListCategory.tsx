import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from "./categorySlice";

export const ListCategory = () => {
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoriesMutation();
  const { enqueueSnackbar } = useSnackbar();

  const rows: GridRowsProp = data?.data
    ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
      }))
    : [];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "is_active",
      headerName: "Is Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionsCell,
    },
  ];

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(rowData.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  async function handleDeleteCategory(id: string) {
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
      <Typography variant="h3" component="h1">
        <Box style={{ display: "flex", height: 600 }}>
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            componentsProps={componentsProps}
            disableColumnSelector={true}
            disableColumnFilter={true}
            disableDensitySelector={true}
            rowsPerPageOptions={[2, 20, 50, 100]}
            rows={rows}
            columns={columns}
          />
        </Box>
      </Typography>
    </Box>
  );
};
