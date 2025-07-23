import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import "./ProductDetails.css";
import ProductDisplayBlock from "../UI/ProductDisplayBlock";
import Slider from "react-slick";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishlistContext";

function ProductDetails() {
  const { products, increaseQTY, decreaseQTY } = useContext(ProductContext);
  const { addToCart, handleProAddFromDetails } = useContext(CartContext);
  const { wishList, addWishlist, removeFromWishList } =
    useContext(WishListContext);
  const params = useParams();
  const selectedProductId = params.id;

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  console.log(selectedProduct);

  const notifyWish = () =>
    toast("💖 Product added to wishlist !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyRemoveWish = () =>
    toast("Product removed from wishlist !", {
      theme: "dark",
      autoClose: 2000,
    });

  function handleAdd() {
    handleProAddFromDetails(selectedProduct);
    console.log(selectedProduct);
  }
  const alreadyAddedToWishlist = wishList.findIndex(
    (list) => list.id === selectedProductId
  );

  function handleAddtoWish() {
    addWishlist(selectedProduct);
    notifyWish();
  }

  function handleRemoveFrmWish() {
    removeFromWishList(selectedProduct.id);
    notifyRemoveWish();
  }
  console.log(alreadyAddedToWishlist);

  let selectedImage = selectedProduct?.image;
  return (
    <>
      <InnerPageBanner>Product Details</InnerPageBanner>

      <section className="productDetailsBlock pt-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="prodcut-image-block">
                <div className="prodcut-image">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: selectedImage,
                        sizes:
                          "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                      },
                      largeImage: {
                        src: selectedImage,
                        width: 700,
                        height: 800,
                        background: "#fff",
                      },
                      // enlargedImageContainerDimensions: {
                      //   width: "120%",
                      //   height: "100%",
                      // },
                      shouldUsePositiveSpaceLens: true,
                    }}
                  />
                  {/* <img src={selectedProduct.image} alt="" /> */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details-content">
                <div className="avail">
                  <span>
                    <i className="bi bi-box-seam"></i>
                  </span>
                  In Stock
                </div>
                <h2 className="product-name">{selectedProduct?.name}</h2>
                <p className="product-price">
                  <span>Price : </span> ${selectedProduct?.price}
                </p>
                {/* <p className="product-price">
                  <span>Total Price : </span>
                  {selectedProduct.price * selectedProduct.quantity}
                </p> */}
                <div className="delivery">
                  <span>
                    <i className="bi bi-truck"></i>
                  </span>
                  Deliver in 2 Days
                </div>
                <div className="prodcut-desc">
                  <p>{selectedProduct?.description}</p>
                </div>

                <div className="qty-addCart-block">
                  <div className="quantity">
                    <button
                      className="qty-btn minus"
                      onClick={() => decreaseQTY(selectedProduct?.id)}
                    >
                      -
                    </button>
                    <span className="qty">{selectedProduct?.quantity}</span>
                    <button
                      className="qty-btn add"
                      onClick={() => increaseQTY(selectedProduct?.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="add-To-cart">
                    <Link
                      to="/cart"
                      className="add-to-cart-btn"
                      onClick={handleAdd}
                    >
                      Add to Cart
                      <span>
                        <i className="bi bi-basket"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="add-wishlist-block mt-3">
                  {alreadyAddedToWishlist !== -1 ? (
                    <div className="add-wishlist" onClick={handleRemoveFrmWish}>
                      <span>
                        <i class="bi bi-heart-fill"></i>
                      </span>
                      Added in wishlist
                    </div>
                  ) : (
                    <div className="add-wishlist " onClick={handleAddtoWish}>
                      <span>
                        <i className="bi bi-heart"></i>
                      </span>
                      Add to wishlist
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <p>
                    <span>SKU:</span>
                  </p>
                  <p>
                    <span>Category:</span> {selectedProduct?.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-extra-info">
        <div className="container">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Description">
              <div className="tab-box">
                <p className="tab-desc">{selectedProduct?.description}</p>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Additional Information">
              <div className="tab-box">
                <ul>
                  <li>
                    <span className="tab-box-head">Weight :</span>
                    <span className="tab-box-content">
                      {selectedProduct?.weight}
                    </span>
                  </li>
                  <li>
                    <span className="tab-box-head">Dimensions :</span>
                    <span className="tab-box-content">
                      {selectedProduct?.dimensions}
                    </span>
                  </li>
                </ul>

                {/* <Table>
                  <tr>
                    <th>Weight : </th>
                    <td> 80 kg</td>
                    <th>Last Name</th>
                      <th>Username</th>
                  </tr>

                  <tr>
                    <th>Dimensions : </th>
                    <td>75 × 80 × 55 cm</td>
                    <td>Otto</td>
                      <td>@mdo</td>
                  </tr>
                </Table> */}
              </div>
            </Tab>
            <Tab eventKey="contact" title="Rating">
              <div className="tab-box">⭐⭐⭐⭐⭐ (20 Customer)</div>
            </Tab>
          </Tabs>
        </div>
      </section>

      <section className="relatedProduct pt-70 pb-70">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Related Products</h2>
          </div>
          <div className="">
            <Slider {...settings}>
              {products.map(
                (product) =>
                  product.category === selectedProduct?.category &&
                  product.id !== selectedProduct.id && (
                    <div className="" key={product.id}>
                      <ProductDisplayBlock
                        product={product}
                        className="proInnerpageSpace"
                      />
                    </div>
                  )
              )}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
