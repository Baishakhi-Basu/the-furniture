import Slider from "react-slick";
import { testimonials } from "../../assets/assets";
import "./Testimonial.css";
import StarRating from "../../UI/StarRating";
import { useInView } from "react-intersection-observer";

function Testimonial() {
  const { ref: ref8, inView: inView8 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  return (
    <section className="testimonial-sec">
      <div className="container">
        <div className="text-center">
          <h2
            ref={ref8}
            className={`${
              inView8
                ? "section-title animate__animated animate__fadeInDown"
                : "section-title"
            }`}
          >
            Happy Clients
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-9">
            <Slider {...settings}>
              {testimonials.map((testItem) => {
                return (
                  <div
                    className="testimonial-inner text-center"
                    key={testItem.id}
                  >
                    <div className="testi-image">
                      <img src={testItem.image} alt="" />
                    </div>
                    <div className="testi-content">
                      <p className="testi-rating">
                        <StarRating rating={testItem.rating} />
                      </p>
                      <p className="testi-text">{testItem.content}</p>
                    </div>
                    <div className="testi-name">
                      <h4>{testItem.name}</h4>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
