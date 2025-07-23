import "./InnerPageBanner.css";
function InnerPageBanner({ children }) {
  return (
    <section className="innerPageBanner">
      <div className="container">
        <div className="innerPageBanner-content">
          <h2>{children}</h2>
        </div>
      </div>
    </section>
  );
}

export default InnerPageBanner;
