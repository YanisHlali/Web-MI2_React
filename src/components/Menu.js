import { NavLink } from "react-router-dom";

export default function Menu() {
     let activeClassName = "menu-link-active";
     let className = "menu-link";
     let currentRoute = window.location.pathname;
     return (
          <div className="menu">
               <div className="menu-item">
                    <NavLink
                         className={({ isActive }) =>
                              isActive || currentRoute === "/" ? activeClassName : className
                         }
                         to="/recette"
                    >
                         Recette
                    </NavLink>
               </div>
               <div className="menu-item">
                    <NavLink
                         className={({ isActive }) =>
                              isActive ? activeClassName : className
                         }
                         to="/blog"
                    >
                         Blog
                    </NavLink>
               </div>
          </div>
     );
}
