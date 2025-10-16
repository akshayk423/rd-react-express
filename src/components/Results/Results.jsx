import "./Results.css";

function Results() {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="results__card">
      {/* <h2 className="results__card-name">{item.name}</h2> */}
      <img
        onClick={handleCardClick}
        className="results__card-image"
        // src={item.link}
        // alt={item.name}
      />
    </li>
  );
}

export default Results;
