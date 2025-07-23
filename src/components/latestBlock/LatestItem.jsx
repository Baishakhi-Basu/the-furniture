import "./LatestItem.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

function LatestItem({ latestNews, className, onMouseEnter, onMouseLeave }) {
  return (
    <>
      <div
        className={`latest-item ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="latest-item-content">
              <div className="latest-post-info">
                <ul>
                  <li>Furniture</li>
                  <li>
                    <span>{latestNews.date}</span>
                  </li>
                </ul>
              </div>
              <div className="latest-heading-text">
                <h3>{latestNews.title}</h3>
                <p>{latestNews.content}</p>
              </div>
              <Link to={`/latestNews/${latestNews.id}`} className="main-button">
                Read More <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="latest-img">
              <img src={latestNews.image} alt="latest-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestItem;
