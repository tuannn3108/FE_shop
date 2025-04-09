import { IoClose } from "react-icons/io5";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import iconSearch from "@/assets/img/iconSearch.png";
import iconshopping from "@/assets/img/iconShopping.png";
import iconUser from "@/assets/img/user-circle.png";
import { useCart } from "react-use-cart";
import { NavRouter } from "@/router/route";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/userSlice/UserSlice";

interface HeaderMobileProps {
  handleCloseMobile: React.MouseEventHandler<HTMLButtonElement>;
  openMenu: boolean;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  handleCloseMobile,
  openMenu,
}) => {
  const { totalUniqueItems } = useCart();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch()
  return (
    <>
      <div
        className={clsx(style.menuMobile, {
          [style.menuMobileOpen]: openMenu,
        })}>
        <div className={style.headerMobile}>
          <Link className={style.logo} to={"/"}>
            Cyrus
          </Link>

          <button onClick={handleCloseMobile} className={style.btnClose}>
            <IoClose color="#6C7275" />
          </button>
        </div>

        <div className={style.navLink}>
          <ul>
            {NavRouter.map((e, i) => (
              <li key={i}>
                <Link to={e.path}>{e.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {user ? (
          <div className={style.LoginMobile}>
            <button onClick={() => dispatch(logout())} className={style.btnLogin}>Logout</button>
          </div>
        ) : (
          <div className={style.LoginMobile}>
            <button className={style.btnLogin}>
              <Link to={'/login'}>Login</Link>
            </button>
          </div>
        )}

        <div className={style.controlBottom}>
          <button className={`${style.btnIcon} ${style.hideOnMobile}`}>
            <img src={iconUser} alt="" />
          </button>
          <button className={`${style.btnIcon} ${style.hideOnMobile}`}>
            <img src={iconSearch} alt="" />
          </button>
          <Link
            to="/cart"
            className={`${style.btnShopping} ${style.hideOnMobile}`}>
            <div className={style.totalCart}>{totalUniqueItems}</div>
            <img src={iconshopping} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
