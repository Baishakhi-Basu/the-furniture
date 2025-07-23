function StarRating({ rating }) {
  return (
    <>
      {[...Array(rating)].map((_, i) => (
        <i key={i} className="bi bi-star-fill text-warning me-1"></i>
      ))}
    </>
  );
}

export default StarRating;
