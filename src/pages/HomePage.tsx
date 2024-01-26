import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { getAllItems } from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";
import Button from "@mui/material/Button";

const HomePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllItems()
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <>
      <Stack direction="row" mt={2} mb={2} spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1">
          Posts list
        </Typography>
        <Button variant="contained" onClick={() => navigate("/create")} size="small" color="success">
          Create post
        </Button>
      </Stack>
      <ItemList items={items} />
    </>
  );
};

export default HomePage;
