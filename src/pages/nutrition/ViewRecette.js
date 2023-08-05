import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

// @mui
import { Grid, Container, Typography } from "@mui/material";
import nutrition from "../../services/api/nutrition.service";
import { Field } from "formik";

export default function ViewRecette() {
  const [showDetails, setShowDetails] = useState([]);
  const [ingredients, setIngredients] = useState(nutrition.ingredients);
  const { id } = useParams();

  useEffect(() => {
    getRecette();
    console.log(ingredients);
  }, []);

  const getRecette = async () => {
    const p = await nutrition.getRecetteByID(id);
    console.log("🚀 ~ file: ViewRecette.js:19 ~ getRecette ~ p:", p);
    setShowDetails(p);
  };

  const findIngredients = async (id) => {
    console.log(ingredients);
    var p = ingredients.find((ing) => ing.id === id);
    console.log("🚀 ~ file: ViewRecette.js:27 ~ findIngredients ~ p:", p);
    return p?.name;
  };

  const CardProduits = () => {};

  return (
    <div>
      {/* Utilisation de l'ID récupéré */}
      <h2>Details de la recette avec l'ID : {id}</h2>
      {/* Affichez les détails de la recette en utilisant l'ID */}
      {JSON.stringify(showDetails)}

      <label htmlFor="title">Title:</label>

      <div className=" flex-col">
        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          {showDetails?.title}
        </h1>

          {showDetails.instructions?.map((recipe, index) => (
            <div class="p-4 w-full mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                <div>
                  <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    Etape {recipe.order}
                  </h3>
                  {recipe.produits.map((produit, i) => (
                    <div class="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Quantité : {produit.quantite} gr</span> <br />
                      <span>Ingredients : {produit.ingredients}</span> <br />
                      {/* {findIngredients(produit.ingredients)} */}
                    </div>
                  ))}

                  <div class="flex items-center space-x-4">
                    <span>
                      Instructions a suivre : <br /> {recipe.description}
                    </span>

                    
                  </div>
                  <h1 class="text-xl font-semibold text-gray-900 sm:text-xl dark:text-white">
                      les eleves : 
                    </h1>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
