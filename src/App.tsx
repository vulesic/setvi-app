import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppBar, Typography, Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailsPage from "./pages/DetailsPage";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <AppBar position="relative">
        <Container>
          <Stack direction="row" mt={2} mb={2} spacing={2} justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ color: "white", border: "1px solid #fff" }}
              startIcon={<KeyboardArrowLeftIcon />}
              disabled={location.pathname === "/"}
            >
              Posts
            </Button>
            <Typography variant="caption" component="p">
            SETVI crud app with API implementation By Dragan Vulešić
            </Typography>
          </Stack>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
