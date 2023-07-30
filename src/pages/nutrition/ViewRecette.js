import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

// @mui
import { Grid, Container, Typography } from "@mui/material";

export default function ViewRecette({ recipe }) {
  const [showDetails, setShowDetails] = useState(false);

  const {id} = recipe.params;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <h2>Details de la recette {id}</h2>
    </div>
  );
}
