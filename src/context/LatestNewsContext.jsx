import { createContext } from "react";
import { latest_news } from "../assets/assets";

export const LatestContext = createContext();

function LatestContextProvider({ children }) {
  const latestNews = {
    latest_news,
  };
  return (
    <LatestContext.Provider value={latestNews}>
      {children}
    </LatestContext.Provider>
  );
}

export default LatestContextProvider;
