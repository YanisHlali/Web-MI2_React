import axios from "axios";
import React, { useEffect, useState } from "react";

import Menu from "../components/Menu.js";

export default function Recette() {
     const [recette, setRecette] = useState([]);
     const [search, setSearch] = useState("");

     useEffect(() => {
          axios.get(
               `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          ).then((response) => {
               setRecette(response.data.meals);
          });
     }, [recette]);

     let recettes = [];
     if (recette != null) {
          for (let i = 0; i < recette.length; i++) {
               recettes.push({
                    name: recette[i].strMeal,
                    instructions: recette[i].strInstructions,
                    origin: recette[i].strArea,
                    image: recette[i].strMealThumb,
               });
          }
     }

     return (
          <div className="pageRecette">
               <Menu />
               <h1>Appli de Recette de cuisine</h1>
               <input
                    className="input"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
               />
               {recette != null ? (
                    recettes.map((element) => (
                         <div className="recette">
                              <h1 className="title-recette">{element.name}</h1>

                              <p className="origin">Origin: {element.origin}</p>

                              <img className="recette" src={element.image} alt="Test" />

                              <p>{element.instructions}</p>
                         </div>
                    ))
               ) : (
                    <div className="pageRecette">
                         <p className="error">
                              Aucune recette ne correspond à votre recherche
                         </p>
                    </div>
               )}
          </div>
     );
}
