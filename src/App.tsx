import Loadable from "react-loadable";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

import "./assets/styles/common.scss";
import "./assets/styles/reset.scss";

const Login = Loadable({
  loader: () => import("./pages/Autharization/Login"),
  loading: () => <div>Идёт загрузка...</div>,
});

const ResetPassword = Loadable({
  loader: () => import("./pages/Autharization/ResetPassword"),
  loading: () => <div>Идёт загрузка...</div>,
});

const Registration = Loadable({
  loader: () => import("./pages/Autharization/Registration"),
  loading: () => <div>Идёт загрузка...</div>,
});

const UserAgreement = Loadable({
  loader: () => import("./pages/UserAgreement"),
  loading: () => <div>Идёт загрузка...</div>,
});

const Profile = Loadable({
  loader: () => import("./pages/Profile"),
  loading: () => <div>Идёт загрузка...</div>,
});

const Cart = Loadable({
  loader: () => import("./pages/Cart"),
  loading: () => <div>Идёт загрузка...</div>,
});

const FullProduct = Loadable({
  loader: () => import("./pages/FullItem"),
  loading: () => <div>Идёт загрузка...</div>,
});


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<FullProduct />} />
        <Route path="user-agreement" element={<UserAgreement />} />
      </Route>
    </Routes>
  );
}

export default App;
