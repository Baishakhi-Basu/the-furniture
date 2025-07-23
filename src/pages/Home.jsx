import Banner from "../components/banner/Banner";
import BgBanner from "../components/bg-banner/BgBanner";
import LatestBlock from "../components/latestBlock/LatestBlock";
import MidBanner from "../components/midBanner/MidBanner";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import ShopByCategory from "../components/ShopByCategory";
import Testimonial from "../components/testimonials/Testimonial";
import TrendingBlock from "../components/trendingBlock/TrendingBlock";

function Home() {
  return (
    <>
      <Banner />
      <ShopByCategory />
      <BgBanner />
      <ProductDisplay />
      <MidBanner />
      <TrendingBlock />
      <Testimonial />
      <LatestBlock />
    </>
  );
}

export default Home;
