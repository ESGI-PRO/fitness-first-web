import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

// @mui
import { Grid, Container, Typography } from "@mui/material";
import nutrition from "../../services/api/nutrition.service";
import { Field } from "formik";
import usersAPI from "../../services/api/users.service";

export default function ViewRecette() {
  const [showDetails, setShowDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [ingredients, setIngredients] = useState(nutrition.ingredients);
  const { id } = useParams();

  useEffect(() => {
    getRecette();
    fetchUsers();
    // console.log(ingredients);
  }, []);

  const fetchUsers = async () => {
    const users = await usersAPI.getUsers();
    setUsers(users);
  };

  const getRecette = async () => {
    const p = await nutrition.getRecetteByID(id);
    // console.log("🚀 ~ file: ViewRecette.js:19 ~ getRecette ~ p:", p);
    setShowDetails(p);
  };

  const findIngredients = async (id) => {
    // console.log(ingredients);
    var p = ingredients.find((ing) => ing.id === id);
    // console.log("🚀 ~ file: ViewRecette.js:27 ~ findIngredients ~ p:", p);
    return p?.name;
  };

  const getStudent = (id) => {
    var m = users.find((it) => it.id === String(id));
    // console.log("🚀 ~ file: ViewRecette.js:37 ~ getStudent ~ m:", id, m);
    return m?.userName ? m.userName : "anonymous";
  };

  return (
    <div>
      {/* {JSON.stringify(showDetails.studentIds)} */}

      <div className=" flex-col">
        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          {showDetails?.title}
        </h1>

        <br />

        {showDetails.studentIds?.length > 1 ? (
          <>
            <h1 class="text-xl pb-6 font-semibold text-gray-900 sm:text-xl dark:text-white">
              Les eleves concernées :
            </h1>
            <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {showDetails.studentIds?.length > 1 ? (
                showDetails.studentIds.map((studentId) => (
                  <li>{getStudent(studentId)}</li>
                ))
              ) : (
                <li>{getStudent(showDetails.studentIds)}</li>
              )}
            </ul>
          </>
        ) : (
          ""
        )}

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
