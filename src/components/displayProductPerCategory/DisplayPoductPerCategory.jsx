import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InnerPageBanner from "../innerPageBanner/InnerPageBanner";
import { ProductContext } from "../../context/ProductContext";
import ProductDisplayBlock from "../../UI/ProductDisplayBlock";
import "./DisplayPoductPerCategory.css";

function DisplayPoductPerCategory() {
  const params = useParams();
  const { categoryCount, products, priceRanges } = useContext(ProductContext);
  const maxProductPrice = Math.max(...products.map((product) => product.price));
  // const minProductPrice = Math.min(...products.map((product) => product.price));
  const navigate = useNavigate();

  const [maxPrice, setMaxPrice] = useState(300);

  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

  // function handlePriceRange(e) {
  //   setMaxPrice(e);
  // }
  // const filteredProducts = products.filter((product) => {
  //   if (product.category === params.category) {
  //     return product.price <= maxPrice;
  //   }

  // });
  function handleCheckedPrice(handleCheckedPrice) {
    setSelectedRange(handleCheckedPrice);
  }
  const filteredProducts = products.filter((product) => {
    return product.category === params.category;
  });

  //  (+product.price < selectedRange.max || +product.price > selectedRange.min)

  const priceFiltered = filteredProducts.filter(
    (product) =>
      Number(product.price) >= selectedRange.min &&
      Number(product.price) <= selectedRange.max
  );

  console.log(filteredProducts);
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
  //     }
  //   })
  // );
  // const minProductPrice = products.reduce((min, product) => {
  //   return product.price < min ? product.price : min;
  // }, products[0].price);

  console.log(categoryCount);

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
                          <input
                            type="checkBox"
                            class="form-check-input me-2"
                            checked={params.category === key ? true : false}
                            onClick={() => navigate(`/product/${key}`)}
                          />
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
                  {/* <input
                    type="range"
                    min="50"
                    max={maxProductPrice}
                    value={maxPrice}
                    onChange={handlePriceRange}
                    className="form-range slider"
                    id="customRange"
                    name="points"
                  /> */}
                </div>
                <div className="range-block-content">
                  {priceRanges.map((priceRange) => (
                    <p className="my-3" key={priceRange.label}>
                      <label>
                        <input
                          type="checkbox"
                          class="form-check-input me-2"
                          checked={selectedRange.label === priceRange.label}
                          onChange={() => handleCheckedPrice(priceRange)}
                        />
                        {priceRange.label}
                      </label>
                    </p>
                  ))}
                  <p>
                    {/* <input type="checkbox" name="priceCheck" /> Range: $30 - $
                    {maxPrice} */}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              {priceFiltered.length > 0 ? (
                <div className="row">
                  {priceFiltered.map((product) => (
                    <div className="col-md-4" key={product.id}>
                      <ProductDisplayBlock product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="notFoundPro">
                  Sorry! No Product Found at this range
                </p>
              )}
              <div className="row"></div>
              {/* <div className="row">
                {products.map(
                  (product) =>
                    product.category === params.category && (
                      <div className="col-md-4" key={product.id}>
                        <ProductDisplayBlock product={product} />
                      </div>
                    )
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default DisplayPoductPerCategory;
