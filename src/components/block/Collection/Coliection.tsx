import Container from "../container/Container";
import style from "./style.module.scss";
import item1 from "@/assets/img/item1banner.png";
import item2 from "@/assets/img/item2banner.png";
import item3 from "@/assets/img/item3banner.png";
import clsx from "clsx";

const Coliection = () => {
  return (
    <Container className="mt-10 h-full">
      <h1 className="mb-4 font-semibold text-3xl">Shop Colection</h1>

      <div className={style.gridBanner}>
        <div className={clsx(style.item, style.livingRoom)}>
          <img src={item1} alt="Gray armchair" />
        </div>
        <div className={clsx(style.item, style.bedroom)}>
          <img src={item2} alt="White dresser" />
        </div>
        <div className="item kitchen">
          <img src={item3} alt="Cream toaster" />
        </div>
      </div>
    </Container>
  );
};

export default Coliection;
