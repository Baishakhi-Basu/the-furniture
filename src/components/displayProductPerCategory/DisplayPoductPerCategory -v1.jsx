import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InnerPageBanner from "../innerPageBanner/InnerPageBanner";
import { ProductContext } from "../../context/ProductContext";
import ProductDisplayBlock from "../../UI/ProductDisplayBlock";
import "./DisplayPoductPerCategory.css";

function DisplayPoductPerCategory() {
  const params = useParams();
  const { categoryCount, products } = useContext(ProductContext);
  const maxProductPrice = Math.max(...products.map((product) => product.price));
  const minProductPrice = Math.min(...products.map((product) => product.price));
  // const maxProductPrice = Math.max(
  //   ...products.map((product) => {
  //     if (product.category === params.category) {
  //       return product.price;
  //     } else return 0;
  //   })
  // );
  // const minProductPrice = Math.min(
  //   ...products.map((product) => {
  //     if (product.category === params.category) {
  //       return product.price;
  //     } else return 0;
  //   })
  // );
  const [maxPrice, setMaxPrice] = useState(300);
  console.log(categoryCount);

  function handlePriceRange(e) {
    setMaxPrice(e.target.value);
  }

  return (
    <>
      <InnerPageBanner>Products</InnerPageBanner>
      <section className="product-section py-100">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="category-product-block">
                <h4 className="inner-page-heading">Category</h4>
                <div>
                  <ul>
                    {Object.entries(categoryCount).map(([key, value]) => {
                      return (
                        <li key={key}>
                          <Link to={`/product/${key}`}>
                            <b>{key}</b> <span>({value})</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="price-range">
                <h4 className="inner-page-heading">Price Range</h4>
                <div className="range-block">
                  {/* <div id="output" class="output">
                    {{ maxPrice }}
                  </div> */}
                  <input
                    type="range"
                    min="0"
                    max={maxProductPrice}
                    value={maxPrice}
                    onChange={handlePriceRange}
                    className="form-range slider"
                    id="customRange"
                    name="points"
                  />
                </div>
                <div className="range-block-content">
                  <p>
                    Range: ${minProductPrice} - ${maxPrice}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {products.map(
                  (product) =>
                    product.category === params.category && (
                      <div className="col-md-4" key={product.id}>
                        <ProductDisplayBlock product={product} />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default DisplayPoductPerCategory;
