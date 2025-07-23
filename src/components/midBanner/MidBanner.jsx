import Slider from "react-slick";
import { assets } from "../../assets/assets";
import "./MidBannerSlider.css";
import { useInView } from "react-intersection-observer";

function MidBanner() {
  const { ref: ref7, inView: inView7 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  //   const slider = [
  //     {
  //       img: assets.mid_slider_1,
  //       title: "Slider 1",
  //       description: "slider 1 description",
  //     },
  //     {
  //       img: assets.mid_slider_2,
  //       title: "Slider 2",
  //       description: "slider 2 description",
  //     },
  //     {
  //       img: assets.mid_slider_3,
  //       title: "Slider 3",
  //       description: "slider 3 description",
  //     },
  //   ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <section className="mid-block-slider">
        <Slider {...settings}>
          <div className="midSlide">
            <img
              src={assets.mid_slider_1}
              alt="slide 1"
              className="img-fluid midSlide-img"
            />
            <div className="midSlide-content">
              <h2
                ref={ref7}
                className={`${
                  inView7 ? "animate__animated animate__fadeInDown" : ""
                }`}
              >
                Perfect fit for your home
              </h2>
              <p>
                From glam vibes to laid-back comfort, these sofas all have one
                thing in common—and that’s amazing value.
              </p>
            </div>
          </div>
          <div className="midSlide">
            <img
              src={assets.mid_slider_2}
              alt="slide 2"
              className="img-fluid midSlide-img"
            />
            <div className="midSlide-content">
              <h2 className="mid-banner-heading">Furniture for Every Budget</h2>
              <p className="mid-banner-subhead">
                From glam vibes to laid-back comfort, these sofas all have one
                thing in common—and that’s amazing value.
              </p>
            </div>
          </div>
          <div className="midSlide">
            <img
              src={assets.mid_slider_3}
              alt="slide 3"
              className="img-fluid midSlide-img"
            />
            <div className="midSlide-content">
              <h2>Perfect fit for your home</h2>
              <p>
                From glam vibes to laid-back comfort, these sofas all have one
                thing in common—and that’s amazing value.
              </p>
            </div>
          </div>
        </Slider>
        {/* <Slider {...settings}>
        {slider.map((slide) => (
          <div key={slide.img} className="midSlide">
            <img
              src={slide.img}
              alt={slide.title}
              className="img-fluid midSlide-img"
            />
            <div className="midSlide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider> */}
        {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className=""></div>
          </div>
        </div>
      </div> */}
      </section>
      <section className="btm-mid-banner py-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="section-heading text-center">
                <h2 className="section-title text-white">
                  Furniture to love now & forever
                </h2>
                <h4 className="section-sub-title ">Modern & Elegant</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MidBanner;
