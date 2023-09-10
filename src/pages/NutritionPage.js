import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik, Field, FieldArray } from "formik";
// @mui
import {
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { fetchData, Basicoptions } from "../utils/fetchData";
import storage from "../context/storage";
import notif from "../services/alert";
import NutritionService from "../services/api/nutrition.service";
import { Link } from "react-router-dom";
import nutrition from "../services/api/nutrition.service";
import usersAPI from "../services/api/users.service";
const API_URL = "http://localhost:8000";

export default function NutritionPage() {
  const [users, setUsers] = useState([]);
  const [MyRecettes, setMyRecettes] = useState([]);
  const [user, setUser] = useState([]);
  const [userID , setUserId] = useState('');
  const [token, setToken] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isTrainer, setTrainer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      // console.log(infos);
      setToken(infos);

      const user = await storage.getItem("user");
      setUser(user);

      const userId = await storage.getUserId()
      setUserId(userId);

      

      // console.log(Basicoptions);

      if (infos && user) {
        Basicoptions.headers.Authorization = `Bearer ${infos}`;
        fetchIngredients();
        fetchMyRecettes();
        fetchUsers();
        setTrainer(user?.isTrainer);
      } else {
        basic();
      }
    };

    basic();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const initialValues = {
    title: "Ma premiere recette de nutrition pour mes eleves !",
    UserId: JSON.stringify(user.id) ? JSON.stringify(user.id) : userID,
    studentIds: [""],
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

  const deleteRecette = (id) => {
    nutrition.deleteNutrition(id).then(() => {
      notif.success("Recette supprimé !");
      fetchMyRecettes();
    });
  };

  const getStudents = (id) => {
    var m = users.find((it) => it.id === id);
    return m?.userName ? m.userName : "anonymous";
  };

  const RecipeCard = ({ recipe }) => {
    const getCoach = (id) => {
      var m = users.find((it) => it.id === id);
      return m.userName;
    };

    return (
      <div className="w-full flex-col bg-white rounded-lg shadow-md p-4 m-4">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        {/* Afficher d'autres informations de la recette ici */}

        <div className="flex flex-row">
          <Link to={`view/${recipe.id}`}>
            <div className="cursor-pointer w-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Voir la recette
            </div>
          </Link>
          <Link to={`edit/${recipe.id}`} state={{ recipe: recipe }}>
            <div
              className={
                isTrainer === true
                  ? "cursor-pointer mx-3 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  : "hidden"
              }
            >
              Modifier la recette
            </div>
          </Link>

          <div
            className={
              isTrainer === true
                ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                : "hidden"
            }
            onClick={() => deleteRecette(recipe.id)}
          >
            supprimer la recette
          </div>
        </div>

        <br />
        <span className="my-3">
          {" "}
          {user.isTrainer
            ? ""
            : "assigné par votre coach :" + getCoach(recipe.UserId)}
        </span>
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

  const fetchIngredients = async () => {
    const p = await nutrition.getIngredients();

    setIngredients(p);
  };

  const fetchMyRecettes = async () => {
    const p = await nutrition.getAllUserNutritions();
    // console.log("🚀 ~ file: NutritionPage.js:104 ~ fetchMyRecettes ~ p:", p);
    setMyRecettes(p);
  };

  const fetchUsers = async () => {
    const users = await usersAPI.getUsers();
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

    nutrition
      .createNutrition(data)
      .then((res) => {
        console.log("La requête a réussi avec le statut");
        notif.success("Votre recette a été créée !");
        setOpen(false);
        fetchMyRecettes();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    values["UserId"] = user.isTrainer && user.isTrainer === true ? user.id : user.trainerId
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
          <Typography variant="h4">
            Mes recettes ({MyRecettes?.length || 0})

          </Typography>

          <div
            onClick={() => setOpen(!open)}
            className={
              "px-8 py-2 flex items-center cursor-pointer  primaryColorBackground cursor-pointer"
            }
          >
            <p className="whiteColor14Medium">
              {open === false ? "Add" : "Close"}
            </p>
          </div>
        </div>

        {JSON.stringify(user)}


        <div className={open === false ? "" : "hidden"}>
          <RecipeList />
        </div>

        <div className={open ? "" : "hidden"}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="title" className="font-bold text-md">
                    Title:
                  </label>
                  <Field
                    className="shadow-sm py-2 px-2 mt-2"
                    type="text"
                    id="title"
                    name="title"
                  />
                </div>

                <div className="my-2">
                  <label htmlFor="StudentIds">Mes eleves :</label>
                  <FieldArray name="StudentIds">
                    {({ push, remove }) => (
                      <div>
                        {values.studentIds?.map((studentId, index) => (
                          <Select
                            className="shadow-sm w-full"
                            onChange={handleChange}
                            name={`studentIds[${index}]`}
                          >
                            {user.traineeIds?.map((option, index) => (
                              <MenuItem
                                key={option}
                                value={option}
                                selected={option === `studentIds[${index}]`}
                              >
                                {getStudents(option)}
                              </MenuItem>
                            ))}
                          </Select>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="my-5">
                  <FieldArray name="instructions">
                    {({ push, remove }) => (
                      <div>
                        {values.instructions?.map((instruction, index) => (
                          <div className="my-5">
                            <div
                              key={index}
                              class="flex-col items-start justify-between px-8 py-4 shadow w-full"
                            >
                              <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                                Etape {index + 1}
                              </h3>
                              <label>Selectionner vos produits :</label>
                              <FieldArray
                                name={`instructions[${index}].produits`}
                              >
                                {({ push, remove }) => (
                                  <div className="w-full justify-between flex flex-row my-3">
                                    <div className="flex flex-row w-full justify-between">
                                      <div>
                                        {instruction.produits.map(
                                          (produit, pIndex) => (
                                            <div key={pIndex} className="mr-4">
                                              <div>
                                                <div className="flex flex-col my-2">
                                                  <label className="mb-2">
                                                    Quantite en gr{" "}
                                                  </label>
                                                  <Field
                                                    type="number"
                                                    className="shadow-sm"
                                                    name={`instructions[${index}].produits[${pIndex}].quantite`}
                                                  />
                                                </div>

                                                <div className="flex flex-col my-2">
                                                  <label className="mb-2">
                                                    Ingredients:
                                                  </label>

                                                  <Select
                                                    className="shadow-sm"
                                                    name={`instructions[${index}].produits[${pIndex}].ingredients`}
                                                    onChange={handleChange}
                                                  >
                                                    {ingredients?.map(
                                                      (option) => (
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
                                                      )
                                                    )}
                                                  </Select>
                                                </div>

                                                <div
                                                  onClick={() => remove(pIndex)}
                                                  className="shadow-sm px-4 py-2 my-4 bg-red-400 cursor-pointer"
                                                >
                                                  <p className="whiteColor14Medium">
                                                    Supprimer ingredient
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>

                                      <div
                                        className="flex flex-col justify-center text-center shadow-sm w-36 h-12 primaryColorBackground cursor-pointer"
                                        onClick={() =>
                                          push({
                                            quantite: 0,
                                            ingredients: 0,
                                          })
                                        }
                                      >
                                        <p className="whiteColor14Medium">
                                          Add Produit
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </FieldArray>

                              <div className="flex flex-col my-2">
                                <label className="mb-2">Description:</label>
                                <Field
                                  className="shadow-sm "
                                  name={`instructions[${index}].description`}
                                />
                              </div>

                              <div
                                onClick={() => remove(index)}
                                className="shadow-sm px-4 py-2 my-4 bg-red-400 cursor-pointer w-48 text-center"
                              >
                                <p className="whiteColor14Medium">
                                  Remove Instruction
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-row  justify-end w-full">
                          <div
                            onClick={() =>
                              push({
                                order: values.instructions?.length,
                                produits: [
                                  {
                                    quantite: "",
                                    ingredients: "",
                                  },
                                ],
                                description: "",
                              })
                            }
                            className="flex flex-col justify-center text-center shadow-sm w-36 h-12 bg-green-400 cursor-pointer"
                          >
                            <p className="whiteColor14Medium">
                              Add Instruction
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <button
                  type="submit"
                  className="text-white w-full h-12 "
                  style={{ backgroundColor: "#FA9C7A" }}
                >
                  <p className="whiteColor16Medium">creer ma recette</p>
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
