import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function ProductCard({ image, title, link, discount }) {
  const theme = useTheme();

  return (
    <CardActionArea href={link}>
      <CardMedia
        image={image}
        title={title}
        sx={{
          paddingTop: "50%",
          maxWidth: "50%",
          margin: "auto",
        }}
      />
      <CardContent>
        <Typography sx={{ height: "8vh", color: theme.palette.primary.black }}>
          {title}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.red,
          }}
        >
          {discount}% de Descuento
        </Typography>
      </CardContent>
    </CardActionArea>
  );
}

export default ProductCard;
