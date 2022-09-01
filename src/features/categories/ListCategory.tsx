import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories);

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    is_active: category.is_active,
    created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
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

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => console.log("clicked")}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/new"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <Typography variant="h3" component="h1">
        <Box style={{ height: 300, width: "100%" }}>
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
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
