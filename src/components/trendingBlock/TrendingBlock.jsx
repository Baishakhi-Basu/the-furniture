import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Slider from "react-slick";
import ProductDisplayBlock from "../../UI/ProductDisplayBlock";
import "./TrendingBlock.css";
import { assets } from "../../assets/assets";
import { useInView } from "react-intersection-observer";

function TrendingBlock() {
  const { products } = useContext(ProductContext);
  const { ref: ref8, inView: inView8 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  };
  return (
    <section className="trending-block py-100">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="section-heading">
              <h2
                ref={ref8}
                className={`${
                  inView8
                    ? "section-title animate__animated animate__fadeInDown"
                    : "section-title"
                }`}
              >
                Trending This Week
              </h2>
            </div>
            <div className="row">
              <Slider {...settings}>
                {products.map(
                  (product) =>
                    product.status === "trending" && (
                      <div className="col-md-4">
                        <ProductDisplayBlock product={product} />
                      </div>
                    )
                )}
              </Slider>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block-image-box">
              <div className="bolck-image">
                <img src={assets.box_img_1} alt="" />
              </div>
              <div className="bolck-content">
                <h2>STURDY AND STYLISH</h2>
                <p>
                  Discover furniture that’s designed to be cherished, evolving
                  with your life and style, making every moment at home even
                  more special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingBlock;
