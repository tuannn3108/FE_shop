import Card from "@/components/ui/Card/Card";
import Container from "../container/Container";
import Slider from "react-slick";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { TypeProduct } from "@/models/model";

const NewArrival = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px", // Tăng lên từ 40px
    slidesToShow: 4,
    speed: 500,
    slidesToScroll: 1, // Đảm bảo slidesToScroll là 1
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1, // Đặt slidesToScroll là 1 cho chế độ centerMode
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    dots: true,
    arrows: true,
  };

  const products = useSelector((state: RootState) => state.product.product);
  const newProducts = products.slice(0, 7);

  return (
    <Container className="mt-10 h-full">
      <h1 className="mb-4 font-semibold text-3xl">New Arrivals</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {newProducts.map((e:TypeProduct) => (
            <div key={e._id}>
              <Card item={e}></Card>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default NewArrival;
