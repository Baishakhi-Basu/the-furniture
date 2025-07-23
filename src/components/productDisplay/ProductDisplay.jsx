import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductDisplayBlock from "../../UI/ProductDisplayBlock";
import "./ProductDisplay.css";
import { useInView } from "react-intersection-observer";

function ProductDisplay() {
  const { products } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState("best-sellers");
  const { ref: ref5, inView: inView5 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="pb-70 product-display-box">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="section-heading">
              <h2
                ref={ref5}
                className={`${
                  inView5
                    ? "section-title animate__animated animate__fadeInDown"
                    : "section-title"
                }`}
              >
                Our Products
              </h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="tabs-product">
              <button
                className={activeTab === "all" ? "active" : ""}
                onClick={() => setActiveTab("all")}
              >
                All Products
              </button>
              <button
                className={activeTab === "best-sellers" ? "active" : ""}
                onClick={() => setActiveTab("best-sellers")}
              >
                Best Sellers
              </button>
              <button
                className={activeTab === "new-arrival" ? "active" : ""}
                onClick={() => setActiveTab("new-arrival")}
              >
                New Arrivals
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map(
            (product) =>
              (activeTab === "all" || product.status === activeTab) && (
                <div className="col-md-3" key={product.id}>
                  <ProductDisplayBlock product={product} />
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDisplay;
