// src/routes.js

import AdminPage from "../Admin/PageAdmin/DefaultPageAdmin/DafaultAdmin";
import NotFounPage from "../pages/NotFounPage";
export const routes = [
  {
    path: '/',
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  }
];
