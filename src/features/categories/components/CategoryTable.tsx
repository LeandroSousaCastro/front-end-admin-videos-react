import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/Category";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const rows = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      is_active: category.name,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

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
        onClick={() => handleDelete(rowData.value)}
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

  const rowCount = data?.meta.total ?? 0;
  return (
    <Box sx={{ display: "flex", height: 680 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={perPage}
        componentsProps={componentsProps}
        filterMode={"server"}
        paginationMode={"server"}
        loading={isFetching}
        rowCount={rowCount}
        rowsPerPageOptions={rowsPerPage}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        components={{ Toolbar: GridToolbar }}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        checkboxSelection={false}
      />
    </Box>
  );
}
