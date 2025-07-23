import { createContext, useState } from "react";

export const WishListContext = createContext();

function WishlistContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);

  function addWishlist(item) {
    const existingWishID = wishList.findIndex(
      (prevList) => prevList.id === item.id
    );

    if (existingWishID === -1) {
      setWishList((prevList) => [...prevList, item]);
    } else {
      return;
    }
  }

  function removeFromWishList(id) {
    setWishList((prevlist) => {
      const filteredList = prevlist.filter((list) => list.id !== id);
      return filteredList;
    });
  }

  const wishListCount = wishList.length;

  const wishListValue = {
    wishList,
    addWishlist,
    removeFromWishList,
    wishListCount,
  };

  return (
    <WishListContext.Provider value={wishListValue}>
      {children}
    </WishListContext.Provider>
  );
}

export default WishlistContextProvider;
