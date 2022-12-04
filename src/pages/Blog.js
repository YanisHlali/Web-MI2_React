import axios from "axios";
import React, { useEffect, useState } from "react";

import Articles from "../components/Articles";
import Menu from "../components/Menu.js";

export default function Blog() {
     const [article, setArticle] = useState([]);
     const [articleUpdated, setArticleUpdated] = useState([]);

     const getArticles = () => {
          axios.get(`http://localhost:3001/articles`).then((response) => {
               setArticle(response.data);
          });
     };

     const addArticle = () => {
          let content = document.getElementById("content").value;
          if (content.length < 100) {
               alert("Votre article doit faire au moins 100 caractères");
          } else {
               let author = document.getElementById("author").value;
               let date = new Date().valueOf();

               let newArticle = {
                    author,
                    content,
                    date,
               };

               axios.post(`http://localhost:3001/articles`, newArticle).then(
                    (response) => {
                         console.log(response);
                    }
               );

               document.getElementById("author").value = "";
               document.getElementById("content").value = "";

               getArticles();
          }
     };

     const deleteArticle = (id) => {
          axios.delete(`http://localhost:3001/articles/${id}`).then(
               (response) => {
                    console.log(response);
               }
          );
          getArticles();
     };

     const getUpdateArticle = (id) => {
          axios.get(`http://localhost:3001/articles/${id}`).then((response) => {
               document.getElementById("author").value = response.data.author;
               document.getElementById("content").value = response.data.content;
               setArticleUpdated(response.data);
          });
          getArticles();
     };

     const updateArticle = () => {
          let author = document.getElementById("author").value;
          let content = document.getElementById("content").value;
          let date = new Date().valueOf();

          let newArticle = {
               author,
               content,
               date,
          };

          axios.put(
               `http://localhost:3001/articles/${articleUpdated.id}`,
               newArticle
          ).then((response) => {
               console.log(response);
          });

          setArticleUpdated();

          document.getElementById("author").value = "";
          document.getElementById("content").value = "";

          getArticles();
     };

     useEffect(() => {
          getArticles();
     }, []);

     let articles = [];
     if (article != null) {
          for (let i = 0; i < article.length; i++) {
               articles.push({
                    id: article[i].id,
                    author: article[i].author,
                    date: transformDate(article[i].date),
                    content: article[i].content,
               });
          }
     }

     return (
          <div className="pageBlog">
               <Menu />
               <h1 className="title">Blog</h1>
               <div className="inputs">
                    <input type="text" id="author" placeholder="" />
                    <textarea
                         className="text"
                         id="content"
                         placeholder="Write something here..."
                    ></textarea>
                    <input
                         className="submit"
                         type="submit"
                         value="Envoyer"
                         onClick={() => {
                              if (articleUpdated.id) {
                                   updateArticle();
                                   getArticles();
                              } else {
                                   addArticle();
                                   getArticles();
                              }
                         }}
                    />
               </div>
               <div className="section-article">
                    {articles.map((element) => (
                         <>
                              <Articles
                                   article={element}
                                   deleteArticle={() => {
                                        deleteArticle(element.id);
                                        getArticles();
                                   }}
                                   getUpdateArticle={() => {
                                        getUpdateArticle(element.id);
                                        getArticles();
                                   }}
                              />
                              <br />
                              <br />
                              <br />
                              <br />
                         </>
                    ))}
               </div>
          </div>
     );
}

function transformDate(date) {
     let newDate = new Date(date);
     let day = formatDate(newDate.getDate());
     let month = formatDate(newDate.getMonth() + 1);
     let year = newDate.getFullYear();
     let dateFormated = day + "/" + month + "/" + year;
     let hour = formatDate(newDate.getHours());
     let minute = formatDate(newDate.getMinutes());
     let seconde = formatDate(newDate.getSeconds());
     let timeFormated = hour + ":" + minute + ":" + seconde;
     return dateFormated + " à " + timeFormated;
}

function formatDate(date) {
     if (date < 10) {
          return "0" + date;
     }
     return date;
}
