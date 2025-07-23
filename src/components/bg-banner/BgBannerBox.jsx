import "./BgBanner.css";
import { useInView } from "react-intersection-observer";

function BgBannerBox({ img, heading, subHeading }) {
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.0,
    triggerOnce: true,
  });
  return (
    <div
      ref={ref3}
      className={
        inView3
          ? "bg-banner-box animate__animated animate__fadeInUp"
          : "bg-banner-box"
      }
    >
      <div className="bg-banner-box-inner">
        <div className="bg-banner-box-img">
          <img src={img} alt="" />
        </div>
        <div className="bg-banner-box-txt">
          <div className="info">
            <p>{subHeading}</p>
            <h2>{heading}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BgBannerBox;
