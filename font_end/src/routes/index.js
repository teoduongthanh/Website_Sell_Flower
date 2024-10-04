// src/routes.js
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import Detailproduct from "../Component/DetailProduct";
import CartOrder from "../Component/CartComponent/Cart";
import Login from "../pages/login";
import ProfilesUpdata from "../pages/Profiles/ProfilesUpdata";
import Profiles from "../pages/Profiles/Profiles";
import AdminPage from "../Admin/PageAdmin/DefaultPageAdmin/DafaultAdmin";
import NotFounPage from "../pages/NotFounPage";
import AdminUser from "../Admin/Component/AdminUserComponent/AdminUser";
import ProductLists from "../Admin/Component/ProductComponent/ProductLists";
import Register from "../pages/Register";
import ShopType from "../pages/ShopType";
import OrdersPage from "../pages/OrdersPage";

export const routes = [
  {
    path: '/',
    page: Home,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/about',
    page: About,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/contact',
    page: Contact,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/shop',
    page: Shop,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: '/shop-type/:type',
    page: ShopType,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: '/shop/detail-product/:_id',
    page: Detailproduct,
    isShowHeader: true,
    isPrivate: true,
  }, 
  {
    path: '/order',
    page: CartOrder,
    isShowHeader: true,
    isPrivate: true,
  }
  , 
  {
    path: '/orders-page',
    page: OrdersPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/login',
    page: Login,
    isShowHeader: false
  },
  {
    path: '/profile/updata-profile',
    page: ProfilesUpdata,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '*',
    page: NotFounPage
  },
  {
    path: '/profile',
    page: Profiles,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/register',
    page: Register,
    isShowHeader: false
  }
];
export const routesAdmin = [
  {
    path: '/system/admin',
    page: AdminPage,
    isShowHeader: false
  },
  {
    path: '/system/admin/products',
    page: ProductLists,
    isShowHeader: false
  },
  {
    path: '/system/admin/order',
    page: AdminPage,
    isShowHeader: false
  },
  {
    path: '/system/admin/user',
    page: AdminUser,
    isShowHeader: false
  }
];
