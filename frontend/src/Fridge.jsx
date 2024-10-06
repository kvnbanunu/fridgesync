import PropTypes from "prop-types";

const Gallery = ({ items }) => {
  return (
    <div className="gallery-container">
      <div className="grid-container">
        {items.map((item, index) => (
          <div className="grid-item" key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="gallery-img-large"
            />
            <p className="ingredient-name-large">{item.name}</p>
            <p className="expiry-date-large">Expiry: {item.expiry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Main App component with images array
function Fridge() {
  const items = [
    {
      name: "Apples",
      image: "https://example.com/apple.jpg",
      expiry: "2023-03-15",
    },
    {
      name: "Bananas",
      image: "https://example.com/banana.jpg",
      expiry: "2023-03-10",
    },
    {
      name: "Carrots",
      image: "https://example.com/carrot.jpg",
      expiry: "2023-03-20",
    },
    {
      name: "Greek Yogurt",
      image: "https://example.com/yogurt.jpg",
      expiry: "2023-03-12",
    },
    {
      name: "Eggs",
      image: "https://example.com/eggs.jpg",
      expiry: "2023-03-18",
    },
    {
      name: "Hummus",
      image: "https://example.com/hummus.jpg",
      expiry: "2023-03-15",
    },
    {
      name: "Mixed Nuts",
      image: "https://example.com/nuts.jpg",
      expiry: "2023-06-01",
    },
    {
      name: "Orange Juice",
      image: "https://example.com/orange-juice.jpg",
      expiry: "2023-03-12",
    },
    {
      name: "Pineapple",
      image: "https://example.com/pineapple.jpg",
      expiry: "2023-03-18",
    },
    {
      name: "Spinach",
      image: "https://example.com/spinach.jpg",
      expiry: "2023-03-20",
    },
  ];

  return (
    <div className="App">
      <h2>Fridge</h2>
      <p>Add items to your fridge</p>
      <Gallery items={items} />
    </div>
  );
}

export default Fridge;
