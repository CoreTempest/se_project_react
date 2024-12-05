import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import likedImg from "../../assets/like-active.svg";
import dislikedImg from "../../assets/like.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemCard({ item, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isLiked = item.likes.some((id) => id === currentUser?._id);
    {
      isLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [item.likes, currentUser._id]);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleCardLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser._id && (
          <img
            className={"card__like-btn"}
            typeof="button"
            src={isLiked ? likedImg : dislikedImg}
            alt="Like Button"
            onClick={handleCardLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
