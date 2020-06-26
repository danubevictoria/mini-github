/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Commits from "views/Commits.js";
import Repositories from "views/Repositories.js";
import UserPage from "views/UserPage.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Organizations",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/repositories",
    name: "Repositories",
    icon: "files_paper",
    component: Repositories,
    layout: "/admin",
    visibility: "hidden",
  },
  {
    path: "/commits",
    name: "Commits",
    icon: "ui-1_bell-53",
    component: Commits,
    layout: "/admin",
    visibility: "hidden",
  },
];
export default dashRoutes;
