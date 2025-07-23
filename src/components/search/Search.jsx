import { useContext, useState } from "react";
import "./Search.css";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

function Search({
  setShowSearch,
  notFoundInput,
  setnotFound,
  userInput,
  setuserInput,
}) {
  const { categoryCount } = useContext(ProductContext);

  const navigate = useNavigate();
  function handleSearchChange(e) {
    setuserInput(e.target.value.toLocaleLowerCase());
    setnotFound(false);
  }

  const categoryName = Object.getOwnPropertyNames(categoryCount);

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(categoryName);
    const [item] = categoryName.filter((item) =>
      userInput.includes(item.toLocaleLowerCase())
    );
    if (item) {
      navigate(`/product/${item}`);

      setuserInput("");
      setShowSearch(false);
    } else {
      setnotFound(true);
    }
  }
  return (
    <div className="search-box-block">
      <div className="search-box">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={userInput}
          />
          <button type="submit" className="search-icon">
            <i className="bi bi-search fs-5"></i>
          </button>
        </form>
      </div>
      {notFoundInput ? (
        <div className="not-found-product">
          <p>
            <span>{userInput}</span> is not available here
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Search;
