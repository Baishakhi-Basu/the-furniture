import { useContext } from "react";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import "./Product.css";

function Product() {
  const { categoryCount } = useContext(ProductContext);
  console.log(categoryCount);

  return (
    <>
      <InnerPageBanner>Products</InnerPageBanner>
      <section className="product-section py-100">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="category-product-block inner-subHeading">
                <h4 className="">Category</h4>
                <div>
                  <ul>
                    {Object.entries(categoryCount).map(([key, value]) => {
                      return (
                        <li key={key}>
                          <Link to={`/product/${key}`}>
                            <b>{key}</b> <span>{value}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9"></div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default Product;
