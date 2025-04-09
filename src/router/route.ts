import Cart from "@/page/Cart/Cart";
import HomePage from "@/page/HomePage";
import MyAccount from "@/page/MyAccount/MyAccount";
import ProductDetail from "@/page/ProductDetail/ProductDetail";
import Shop from "@/page/Shop/Shop";

export const PublicRoute = [
  {
    name: "Home",
    path: "/",
    link: true,
    component: HomePage,
  },
  {
    name: "Shop",
    path: "/shop",
    link: true,
    component: Shop,
  },
  {
    name: "Cart",
    path: "/cart",
    link: true,
    component: Cart,
  },
  {
    name: "Product",
    path: "/product/:id",
    link: true,
    component: ProductDetail,
  },
  {
    name: "MyAccount",
    path: "/myaccount",
    link: true,
    component: MyAccount,
  },
];

export const NavRouter = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Shop",
    path: "/shop",
  },
  {
    title: "Product",
    path: "/product",
  },
  {
    title: "Contact Us",
    path: "/contactus",
  },
];
