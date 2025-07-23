import { useState } from "react";
import LatestItem from "./LatestItem";
import { useContext } from "react";
import { LatestContext } from "../../context/LatestNewsContext";
import { useInView } from "react-intersection-observer";

function LatestBlock() {
  const { latest_news } = useContext(LatestContext);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { ref: ref8, inView: inView8 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <section className="latest-block-sec pt-100 pb-100">
      <div className="container">
        <div className="section-heading">
          <h2
            ref={ref8}
            className={`${
              inView8
                ? "section-title text-center animate__animated animate__fadeInDown"
                : "section-title text-center"
            }`}
          >
            Latest news
          </h2>
        </div>
        <div className="latest-block">
          {latest_news.map((latestNews, index) => (
            <LatestItem
              key={index}
              latestNews={latestNews}
              onMouseEnter={() => setHoverIndex(index)}
              className={hoverIndex === index ? "active" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestBlock;
