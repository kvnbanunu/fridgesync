import React, { useState, useEffect } from 'react';
import './index.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      const items = [
        { id: 1, name: 'Milk', image: 'https://via.placeholder.com/200x200?text=Milk' },
        { id: 2, name: 'Eggs', image: 'https://via.placeholder.com/200x200?text=Eggs' },
        { id: 3, name: 'Butter', image: 'https://via.placeholder.com/200x200?text=Butter' },
        { id: 4, name: 'Cheese', image: 'https://via.placeholder.com/200x200?text=Cheese' },
        { id: 5, name: 'Vegetables', image: 'https://via.placeholder.com/200x200?text=Vegetables' },
        { id: 6, name: 'Fruit', image: 'https://via.placeholder.com/200x200?text=Fruit' },
        { id: 7, name: 'Yogurt', image: 'https://via.placeholder.com/200x200?text=Yogurt' },
      ];
      setFridgeItems(items);
    };

    fetchFridgeItems();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(fridgeItems.length / 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(fridgeItems.length / 5)) % Math.ceil(fridgeItems.length / 5));
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * (100 / 5)}%)` }}>
        {fridgeItems.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={prevSlide}>❮</button>
      <button className="carousel-control next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;