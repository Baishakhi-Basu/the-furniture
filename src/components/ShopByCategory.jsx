import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Slider from "react-slick";
import "./ShopByCategory.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function ShopByCategory() {
  const { categoryCount, cat_list } = useContext(ProductContext);
  // const { ref, inView } = useInView({
  //   threshold: 0.2, // Trigger when 20% is visible
  //   triggerOnce: true, // Only trigger once
  // });
  //console.log(categoryCount);

  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
    <section className="py-100">
      <div className="container">
        <div className="section-heading">
          <h2
            ref={ref1}
            className={`${
              inView1
                ? "section-title animate__animated animate__fadeInDown"
                : "section-title"
            }`}
          >
            SHOP BY CATEGORY
          </h2>
        </div>
        <div
          ref={ref2}
          className={`${
            inView2
              ? "show-category animate__animated animate__fadeInUp"
              : "show-category"
          }`}
        >
          <div className="slider-container">
            <Slider {...settings}>
              {cat_list.map((catItem) => (
                <div className="">
                  <div className="show-cat-box">
                    <div className="show-cat-icon">
                      <img src={catItem.cat_image} alt="" />
                    </div>
                    <div className="show-cat-text">
                      <Link to={`/product/${catItem.cat_name}`}>
                        <h4>{catItem.cat_name}</h4>
                      </Link>

                      <p>{categoryCount[catItem.cat_name] || 0} products</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
