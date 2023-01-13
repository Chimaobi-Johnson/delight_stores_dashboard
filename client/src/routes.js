/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Login from "views/Login";
import Register from "views/Register";
import Users from "views/Users";
import Products from "views/Products";
import Categories from "views/Categories";
import AddProduct from "views/AddProduct";
import AddCategory from "views/AddCategory";
import EditCategory from "views/EditCategory";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-notes",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/product/add",
    name: "Add Product",
    icon: "nc-icon nc-notes",
    component: AddProduct,
    layout: "/admin",
    removeLink: "true"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-notes",
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/category/new",
    name: "Add Category",
    icon: "nc-icon nc-notes",
    component: AddCategory,
    layout: "/admin",
    removeLink: "true"
  },
  {
    path: "/category/edit",
    name: "Edit Category",
    icon: "nc-icon nc-notes",
    component: EditCategory,
    layout: "/admin",
    removeLink: "true"
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bell-55",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-bell-55",
    component: Register,
    layout: "/auth"
  }
];

export default dashboardRoutes;
