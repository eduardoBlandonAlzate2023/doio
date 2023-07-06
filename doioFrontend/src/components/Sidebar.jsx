import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, setSearchItem } from "../store";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";

const CategoryButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.large,
  color: theme.palette.primary.white,
  width: "100%",
  "&:hover": {
    color: theme.palette.primary.black,
    backgroundColor: theme.palette.primary.white,
  },
}));

function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.state.isSidebarOpen);
  const categories = useSelector((state) => state.state.categories);
  const theme = useTheme();

  const toggleDrawer = () => {
    dispatch(toggleSidebar());
  };

  const handleCategoryClick = (category) => {
    dispatch(setSearchItem(category));
  };

  const sidebarContent = (
    <List>
      {categories &&
        categories.map((category, k) => (
          <ListItem key={k}>
            <CategoryButton onClick={() => handleCategoryClick(category)}>
              {category}
            </CategoryButton>
          </ListItem>
        ))}
    </List>
  );

  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: "30%",
          [theme.breakpoints.down("sm")]: {
            width: "60%",
          },
          backgroundColor: theme.palette.primary.gray,
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}

export default Sidebar;
