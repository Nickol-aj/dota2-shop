import type { FC } from "react";

import { Outlet } from "react-router-dom";

import { Header } from "../components";

const MainLayout: FC = () => {
  return (
    <div className="wrapper">
      {window.location.pathname == "/login" ||
      window.location.pathname == "/registration" ||
      window.location.pathname == "/user-agreement" ? (
        <></>
      ) : (
        <Header />
      )}
      <div className="section__container">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
