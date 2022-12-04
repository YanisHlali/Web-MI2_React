import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Recette from "./pages/Recette.js";
import Blog from "./pages/Blog.js";

const App = () => {

     return (
          <div>
               <BrowserRouter>
                    <Routes>
                         <Route path="/" element={<Recette />} />
                         <Route path="blog" element={<Blog />} />
                         <Route path="recette" element={<Recette />} />
                    </Routes>
               </BrowserRouter>
          </div>
     );
};

export default App;
