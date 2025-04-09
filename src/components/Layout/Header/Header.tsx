import style from "./styles.module.scss";
import logo from "@/assets/img/Logo.png";
import Container from "@/components/block/container/Container";
import { NavRouter } from "@/router/route";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ControlRight from "@/components/ui/ControlRight";
import { FaBars } from "react-icons/fa";
import HeaderMobile from "./HeaderMobile";

interface Route {
  title: string;
  path: string;
}

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openMenu, setOnpenMenu] = useState<boolean>(false);

  const handleCloseMobile = () => {
    setOnpenMenu(false)
  }

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={clsx(style.header, { [style.scrolled]: scrolled })}>
      <Container className={style.content}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} className={style.imgLogo} alt="" />
            <span>Cyrus</span>
          </Link>
        </div>

        <nav>
          <ul>
            {NavRouter.map((e: Route, i: number) => (
              <li key={i}>
                <Link
                  className={clsx({
                    [style.linkActive]: location.pathname === e.path,
                  })}
                  to={e.path}>
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={style.controlRight}>
          <ControlRight />
          <button onClick={() => setOnpenMenu(true)} className={style.btnBar}>
            <FaBars />
          </button>
        </div>
      </Container>

      {openMenu &&   <HeaderMobile openMenu handleCloseMobile={handleCloseMobile}  /> }
     
    </header>
  );
};

export default Header;
