import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import BgBannerBox from "./BgBannerBox";

function BgBanner() {
  const { assets } = useContext(ProductContext);
  return (
    <section className="pb-100 bg-banner">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <BgBannerBox
              img={assets.box_1}
              heading="Bed Room"
              subHeading="Designed Pieces"
            />
          </div>
          <div className="col-md-6">
            <BgBannerBox
              img={assets.box_2}
              heading="Living Room"
              subHeading="Furniture For"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BgBanner;
