import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ConfigProvider } from 'antd';
import { CartProvider } from "react-use-cart";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider theme={{ token: { colorPrimary: '#929292' }, components: { Layout: { headerHeight: 54 } } }}>
        <CartProvider>
          <App />
        </CartProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
