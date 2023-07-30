import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik, Field, FieldArray } from "formik";
// @mui
import { Grid, Container, Typography, Select, MenuItem } from "@mui/material";
import { fetchData, Basicoptions } from "../utils/fetchData";
import storage from "../context/storage";
import notif from "../services/alert";
import NutritionService from "../services/api/nutrition.service";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:8000";
const apiService = new NutritionService();

export default function NutritionPage() {
  const [users, setUsers] = useState([]);
  const [MyRecettes, setMyRecettes] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);

  const Basicoptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ` + token,
      accept: "application/json",
    },
  };

  useEffect(() => {
    const basic = async () => {
      const infos = await storage.getToken();
      console.log(infos);
      setToken(infos);

      const user = await storage.getItem("user");
      setUser(user);

      console.log(Basicoptions);

      if (infos && user) {
        Basicoptions.headers.Authorization = `Bearer ${infos}`;
        fetchUsers();
        fetchIngredients();
        fetchMyRecettes();
      } else {
        basic();
      }
    };

    basic();
  }, []);

  const initialValues = {
    title: "Ma premiere recette de nutrition pour mes eleves !",
    UserId: user.id,
    studentIds: [],
    instructions: [
      {
        order: 1,
        produits: [
          {
            quantite: "",
            ingredients: "",
          },
        ],
        description: "",
      },
    ],
  };

  const RecipeCard = ({ recipe }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 m-4">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        {/* Afficher d'autres informations de la recette ici */}
        <Link to={`/nutrition/${recipe.id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voir la recette
          </button>
        </Link>
      </div>
    );
  };

  const RecipeList = () => {
    return (
      <div className="flex flex-wrap justify-center">
        {MyRecettes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    );
  };

  const fetchIngredients = () => {
    fetchData(API_URL + "/nutrition/ingredients", Basicoptions).then((data) => {
      console.log(data.data?.nutrition);
      setIngredients(data.data?.nutrition);
    });
  };

  const fetchMyRecettes = async () => {
   await fetchData(API_URL + "/nutrition/" + user?.id + "/user", Basicoptions).then(
      (data) => {
        console.log(data.data?.nutrition);
        setMyRecettes(data.data?.nutrition);
      }
    );
  };

  const fetchUsers = () => {
    const users = fetchData(API_URL + "/users", Basicoptions);
    setUsers(users);
  };

  const createRecette = async (data) => {
    // fetchData(API_URL + "/nutrition", {
    //   method: "POST",
    //   body: JSON.stringify({data}),
    //   headers: {
    //     Authorization: `Bearer ` + token,
    //     accept: "application/json",
    //   },
    // })

    apiService
      .createNutrition(data)
      .then((res) => {
        console.log("La requête a réussi avec le statut");
        notif.success("Votre recette a été créée !");
        setOpen(false);
        setMyRecettes([...MyRecettes, data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    values["UserId"] = user.id;
    console.log(values);
    createRecette(values);
    resetForm();
  };

  return (
    <>
      <Helmet>
        <title> Dashboard - Mes Recettes </title>
      </Helmet>

      <Container maxWidth="xl">
        <div className="flex justify-between my-5">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Mes recettes
          </Typography>
          <button
            onClick={() => setOpen(!open)}
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            Add
          </button>
        </div>

        <RecipeList />
        {JSON.stringify(user)}
        

        <div className={open ? "" : "hidden"}>
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
                        {values.studentIds.map((studentId, index) => (
                          <div key={index}>
                            <Field
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name={`StudentIds[${index}]`}
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="shadow-sm w-36 m-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="shadow-sm w-36 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onClick={() => push("")}
                        >
                          Add Student
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="m-5">
                  <FieldArray name="instructions">
                    {({ push, remove }) => (
                      <div>
                        {values.instructions.map((instruction, index) => (
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
                                            <label>Quantite:</label>
                                            <Field
                                              type="number"
                                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              name={`instructions[${index}].produits[${pIndex}].quantite`}
                                            />

                                            <label>Ingredients:</label>
                                            <Select
                                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              name={`instructions[${index}].produits[${pIndex}].ingredients`}
                                              onChange={handleChange}
                                            >
                                              {ingredients?.map((option) => (
                                                <MenuItem
                                                  key={option.id}
                                                  value={option.id}
                                                  selected={
                                                    option.id ===
                                                    `instructions[${index}].produits[${pIndex}].ingredients`
                                                  }
                                                >
                                                  {option.name}
                                                </MenuItem>
                                              ))}
                                            </Select>

                                            <button
                                              type="button"
                                              onClick={() => remove(pIndex)}
                                              className="shadow-sm w-36 m-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                              Remove
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
                                      Add Produit
                                    </button>
                                  </div>
                                )}
                              </FieldArray>

                              <label>Description:</label>
                              <textarea
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                name={`instructions[${index}].description`}
                              />

                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="shadow-sm w-36 m-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              >
                                Remove
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
                          Add Instruction
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

        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
}
