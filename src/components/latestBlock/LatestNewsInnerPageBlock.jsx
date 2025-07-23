import "./LatestNewsInnerPageBlock.css";

function LatestNewsInnerPageBlock({ news }) {
  return (
    <div className="latest-news-innerpage">
      <div className="latest-news-img">
        <img src={news.image} alt="" />
      </div>
      <div className="latest-news-content">
        <h5 className="news-title">{news.topic}</h5>
        <h2 className="news-heading">{news.title}</h2>
        <p>{news.date}</p>
        <p className="news-content">{news.content}</p>
      </div>
    </div>
  );
}

export default LatestNewsInnerPageBlock;
