import React, { ReactNode, useEffect } from "react";
import Notification from "./NotificationBar/Notification";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllproducts } from "@/redux/productSlice/ProductSlice";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingPage from "@/page/Loading/LoadingPage";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const loading = useSelector((state: RootState) => state.product.loading)
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getAllproducts());
  }, [dispatch]);

  
  if(loading) {
    return (
      <LoadingPage /> 
    )
  }

  return (
    <>
      <Notification />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
