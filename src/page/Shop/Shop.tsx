import HeroShop from "./HeroShop/HeroShop";
import Container from "@/components/block/container/Container";
import MainProduct from "./MainProduct/MainProduct";
import Banner from "@/components/block/Banner/Banner";

const Shop = () => {
  return (
    <>
      <Container>
        <HeroShop />
        <MainProduct />
      </Container>
      <Banner />
    </>
  );
};

export default Shop;
