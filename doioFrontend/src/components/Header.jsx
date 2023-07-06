import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { toggleSidebar, setSearchItem } from "../store";
import logo from "../assets/logo.png";

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.grey,
}));

const LogoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
}));

const Logo = styled("img")({
  height: '10vh',
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
  },
}));

function AppHeader() {
  const dispatch = useDispatch();

  const handleMenuButtonClick = () => {
    dispatch(toggleSidebar(true));
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      dispatch(setSearchItem(event.target.value));
    }
  };

  return (
    <Header position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuButtonClick}
        >
          <MenuIcon />
        </IconButton>
        <LogoWrapper>
          <Logo src={logo} alt="logo" />
        </LogoWrapper>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput
            placeholder="Busca productos y categorias"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={handleSearch}
          />
        </Search>
      </Toolbar>
    </Header>
  );
}

export default AppHeader;
