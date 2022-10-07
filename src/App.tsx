import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route } from "react-router-dom";
import { ListCategory } from "./features/categories/ListCategory";
import { CreateCategory } from "./features/categories/CreateCategory";
import { EditCategory } from "./features/categories/EditCategory";
import { SnackbarProvider } from "notistack";
import { ListCastMembers } from "./features/cast-members/ListCastMembers";
import { CreateCastMember } from "./features/cast-members/CreateCastMember";
import { EditCastMember } from "./features/cast-members/EditCastMember";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            color: "white",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              {/* Category */}
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              {/* Cast Members */}
              <Route path="/cast-members" element={<ListCastMembers />} />
              <Route
                path="/cast-members/create"
                element={<CreateCastMember />}
              />
              <Route
                path="/cast-members/edit/:id"
                element={<EditCastMember />}
              />

              <Route
                path="*"
                element={
                  <Box sx={{ color: "white" }}>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h2">Not Found</Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
