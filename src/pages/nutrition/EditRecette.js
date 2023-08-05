import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, FieldArray } from "formik";
import { Redirect } from "react-router-dom";
// @mui
import { Grid, Container, Typography, Select, MenuItem } from "@mui/material";
import { fetchData, Basicoptions } from "../../utils/fetchData";
import storage from "../../context/storage";
import notif from "../../services/alert";
// @mui
import nutrition from "../../services/api/nutrition.service";

const user = await storage.getItem("user");
export default function EditRecette({ recipe }) {
  const [ingredients, setIngredients] = useState(nutrition.ingredients);
  const { id } = useParams();
  let { state } = useLocation();
  const [initialValues, setInitialValues] = useState(state.recipe);
  const navigate = useNavigate();

  useEffect(() => {
    getRecette();
    console.log(state);
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    // values["UserId"] = user.id;
    values["studentIds"] = [...values["studentIds"]]
    console.log(values);
    nutrition.updateNutrition(values).then(() => {
      notif.success("Recette mise a jour !");
      navigate("/dashboard/nutrition", { replace: true });
    });
    resetForm();
  };

  const getRecette = async () => {
    try {
      const recette = await nutrition.getRecetteByID(id);
      setInitialValues(recette);
    } catch (error) {
      console.error("Error fetching recette:", error);
    }
  };

  const findIngredients = async (id) => {
    console.log(ingredients);
    var p = ingredients.find((ing) => ing.id === id);
    console.log("🚀 ~ file: ViewRecette.js:27 ~ findIngredients ~ p:", p);
    return p?.name;
  };

  return (
    <div>
      {/* {JSON.stringify(initialValues)}
      {JSON.stringify(user)} */}

      <div className="flex row items-center mb-9 ">
        <Link to="/dashboard/nutrition">

        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          ></path>
        </svg>
        </Link>

        <h3 class="mb-1 mx-5 text-4xl font-bold text-gray-900 dark:text-white">
          Editer une recette
        </h3>
      </div>

      <hr/>

      <div className={open ? "my-5" : "hidden"}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <Field
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="text"
                id="title"
                name="title"
              />

              <div className="m-5">
                <label htmlFor="StudentIds">Mes eleves :</label>
                <FieldArray name="StudentIds">
                  {({ push, remove }) => (
                    <div>
                      {values.studentIds?.map((studentId, index) => (
                        <>
                          <select
                            class="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            onChange={handleChange}
                            name={`studentIds[${index}]`}
                            multiple
                          >
                            {user.traineeIds?.map((option, index) => (
                              <option
                                key={option}
                                value={option}
                                selected={option === studentId}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="m-5">
                <FieldArray name="instructions">
                  {({ push, remove }) => (
                    <div>
                      {values.instructions?.map((instruction, index) => (
                        <div className="m-5">
                          <div
                            key={index}
                            class="flex-col items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800"
                          >
                            <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                              Etape {index + 1}
                            </h3>
                            <label>Selectionner vos produits :</label>
                            <FieldArray
                              name={`instructions[${index}].produits`}
                            >
                              {({ push, remove }) => (
                                <div className="grid grid-cols-4 m-3">
                                  {instruction.produits.map(
                                    (produit, pIndex) => (
                                      <div key={pIndex} className="mx-4">
                                        <div className="">
                                          <label>Quantite (en gr)</label>
                                          <Field
                                            type="number"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            name={`instructions[${index}].produits[${pIndex}].quantite`}
                                          />

                                          <label>Ingredients:</label>

                                          <select
                                            class="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            name={`instructions[${index}].produits[${pIndex}].ingredients`}
                                            onChange={handleChange}
                                          >
                                            {ingredients?.map((option) => (
                                              <option
                                                key={option.id}
                                                value={option.id}
                                                selected={
                                                  option.id ===
                                                  produit.ingredients
                                                }
                                              >
                                                {option.name}
                                              </option>
                                            ))}
                                          </select>

                                          <button
                                            type="button"
                                            onClick={() => remove(pIndex)}
                                            className="shadow-sm w-36 my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          >
                                            Supprimer ingredient
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                  <button
                                    type="button"
                                    className="shadow-sm w-36 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onClick={() =>
                                      push({
                                        quantite: 0,
                                        ingredients: 0,
                                      })
                                    }
                                  >
                                    Ajouter
                                  </button>
                                </div>
                              )}
                            </FieldArray>

                            <label>Description:</label>
                            <Field
                              as="textarea"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name={`instructions[${index}].description`}
                            />

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="shadow-sm w-36 m-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            order: values.instructions.length,
                            produits: [
                              {
                                quantite: "",
                                ingredients: "",
                              },
                            ],
                            description: "",
                          })
                        }
                        className="text-white m-5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                      >
                        Ajouter une etape
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                className="text-white w-full bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              >
                creer ma recette
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
