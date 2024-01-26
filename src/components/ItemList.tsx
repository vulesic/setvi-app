import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ItemListPropsT } from "../interfaces";

const ItemList: React.FC<ItemListPropsT> = ({ items }) => {
  return (
    <List sx={{ maxHeight: "600px", overflow: "auto", border: "1px solid #e9e9e9", borderRadius: "4px" }}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          component={Link}
          to={`/details/${item.id}`}
          sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" component="div" color="textPrimary" sx={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
            }
            secondary={item.body}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
