import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const openPreview = () => {
    handleCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={openPreview}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
