import { useContext } from "react";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { LatestContext } from "../context/LatestNewsContext";
import { Link, useParams } from "react-router-dom";
import LatestNewsInnerPageBlock from "../components/latestBlock/LatestNewsInnerPageBlock";

function LatestNewsPage() {
  const { latest_news } = useContext(LatestContext);
  const params = useParams();
  return (
    <>
      <InnerPageBanner>Latest News</InnerPageBanner>
      <section className="latest-news py-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {latest_news.map(
                (news) =>
                  news.id === params.id && (
                    <LatestNewsInnerPageBlock key={news.id} news={news} />
                  )
              )}
            </div>
            <div className="col-md-4">
              <div className="latest-news-right">
                <h2 class="section-title">Latest News</h2>
                {latest_news.map((latestNews) => (
                  <div key={latestNews.id} className="latest-news">
                    <div className="latest-image">
                      <Link to={`/latestNews/${latestNews.id}`}>
                        <img src={latestNews.image} alt="" />
                        <span>{latestNews.id}</span>
                      </Link>
                    </div>
                    <div className="latest-content">
                      <p>{latestNews.date}</p>
                      <Link to={`/latestNews/${latestNews.id}`}>
                        <h4>{latestNews.title}</h4>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LatestNewsPage;
