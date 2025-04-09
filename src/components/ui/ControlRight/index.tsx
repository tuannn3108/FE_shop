import style from "./style.module.scss";
import iconSearch from "@/assets/img/iconSearch.png";
import iconshopping from "@/assets/img/iconShopping.png";
import iconUser from "@/assets/img/user-circle.png";
import { logout } from "@/redux/userSlice/UserSlice";
import { Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ControlRight = () => {
  const { totalUniqueItems } = useCart();

  const isLoggin = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      {isLoggin ? (
        <>
          <Menu.Item key="account">
            <Link to="/myaccount">My Account</Link>
          </Menu.Item>
          <Menu.Item key="signout" onClick={() => dispatch(logout())}>
            Sign out
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <button className={`${style.btnIcon} ${style.hideOnMobile}`}>
          <img src={iconUser} alt="User Icon" />
        </button>
      </Dropdown>

      <button className={`${style.btnIcon} ${style.hideOnMobile}`}>
        <img src={iconSearch} alt="Search Icon" />
      </button>

      <Link to="/cart" className={`${style.btnShopping} ${style.hideOnMobile}`}>
        <div className={style.totalCart}>{totalUniqueItems}</div>
        <img src={iconshopping} alt="Shopping Cart Icon" />
      </Link>
    </>
  );
};

export default ControlRight;
