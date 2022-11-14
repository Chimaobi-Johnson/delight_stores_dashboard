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
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import { Container } from "react-bootstrap";

function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          paddingTop: '5%',
          backgroundImage:
            'linear-gradient(to bottom, #ffffff49, #0000009c), url("/images/landing-basket.png")',
            backgroundSize: "cover",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
        }}
      fluid>
        {/* <h1>WELCOME TO THE AUTH PAGE</h1> */}
        <div>
          <Switch>{getRoutes(routes)}</Switch>
        </div>
      </Container>
    </>
  );
}

export default Auth;
