import Slider from "react-slick";
import "./Banner.css";
import { Link } from "react-router-dom";

const bannerData = [
  {
    image: "/images/banner1.jpg",
    title: "Luxury Wooden Furniture",
    subtitle: "Design your dream space with elegance",
    button: "Shop Now",
  },
  {
    image: "/images/banner2.jpg",
    title: "Minimalist Interiors",
    subtitle: "Simple yet stunning home styles",
    button: "Explore More",
  },
  {
    image: "/images/banner3.jpg",
    title: "Vintage Sofa Collection",
    subtitle: "Classic comfort that lasts forever",
    button: "View Collection",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
  arrows: false,
  pauseOnHover: false,
};

function Banner() {
  return (
    <div className="banner">
      <Slider {...settings}>
        {bannerData.map((banner, index) => (
          <div key={index}>
            <div className="banner-main">
              <img
                src={banner.image}
                alt="slide 1"
                className="img-fluid midSlide-img"
              />
              <div className="banner-content">
                <h2 className="banner-heading animate__animated animate__fadeInUp">
                  {banner.title}
                </h2>
                <h4 className="banner-text">{banner.subtitle}</h4>
                <Link to="/product" className="main-button">
                  {banner.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
