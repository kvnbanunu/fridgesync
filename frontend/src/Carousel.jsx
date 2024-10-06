// import { useState, useEffect } from "react";
// import "./index.css";

// const Carousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [fridgeItems, setFridgeItems] = useState([]);

//   useEffect(() => {
//     const fetchFridgeItems = async () => {
//       const items = [
//         {
//           id: 1,
//           name: "Milk",
//           image: "https://via.placeholder.com/200x200?text=Milk",
//         },
//         {
//           id: 2,
//           name: "Eggs",
//           image: "https://via.placeholder.com/200x200?text=Eggs",
//         },
//         {
//           id: 3,
//           name: "Butter",
//           image: "https://via.placeholder.com/200x200?text=Butter",
//         },
//         {
//           id: 4,
//           name: "Cheese",
//           image: "https://via.placeholder.com/200x200?text=Cheese",
//         },
//         {
//           id: 5,
//           name: "Vegetables",
//           image: "https://via.placeholder.com/200x200?text=Vegetables",
//         },
//         {
//           id: 6,
//           name: "Fruit",
//           image: "https://via.placeholder.com/200x200?text=Fruit",
//         },
//         {
//           id: 7,
//           name: "Yogurt",
//           image: "https://via.placeholder.com/200x200?text=Yogurt",
//         },
//       ];
//       setFridgeItems(items);
//     };

//     fetchFridgeItems();
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(fridgeItems.length / 3));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(fridgeItems.length / 3)) % Math.ceil(fridgeItems.length / 3));
//   };

//   return (
//     <div className="carousel">
//       <div className="carousel-inner" style={{ transform: `translateY(-${currentSlide * (100 / 3)}%)` }}>
//         {fridgeItems.map((item) => (
//           <div key={item.id} className="carousel-item">
//             <img src={item.image} alt={item.name} />
//             <h2>{item.name}</h2>
//           </div>
//         ))}
//       </div>
//       <button className="carousel-control prev" onClick={prevSlide}>❮</button>
//       <button className="carousel-control next" onClick={nextSlide}>❯</button>
//     </div>
//   );
//   };
  
  
  
import React, { useState } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fridgeItems = [
    {
      id: 1,
      name: "Milk",
      image: "https://via.placeholder.com/200x200?text=Milk",
    },
    {
      id: 2,
      name: "Eggs",
      image: "https://via.placeholder.com/200x200?text=Eggs",
    },
    {
      id: 3,
      name: "Butter",
      image: "https://via.placeholder.com/200x200?text=Butter",
    },
    {
      id: 4,
      name: "Cheese",
      image: "https://via.placeholder.com/200x200?text=Cheese",
    },
    {
      id: 5,
      name: "Vegetables",
      image: "https://via.placeholder.com/200x200?text=Vegetables",
    },
    {
      id: 6,
      name: "Fruit",
      image: "https://via.placeholder.com/200x200?text=Fruit",
    },
    {
      id: 7,
      name: "Yogurt",
      image: "https://via.placeholder.com/200x200?text=Yogurt",
    },
  ];

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + fridgeItems.length) % fridgeItems.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % fridgeItems.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-control prev" onClick={handlePrevClick}>&lt;</div>
      <div className="carousel-inner">
        {Array(Math.ceil(fridgeItems.length / 3)).fill(0).map((_, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            {fridgeItems.slice(index * 3, (index + 1) * 3).map((item, idx) => (
              <div key={idx} className="item">
                <img className='recipe-image' src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="carousel-control next" onClick={handleNextClick}>&gt;</div>
    </div>
  );
};

export default Carousel;