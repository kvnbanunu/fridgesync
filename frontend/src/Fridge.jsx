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
      name: "Milk",
      image: "https://via.placeholder.com/150",
      expiry: "3 days",
    },
    {
      name: "Eggs",
      image: "https://via.placeholder.com/150",
      expiry: "5 days",
    },
    {
      name: "Cheese",
      image: "https://via.placeholder.com/150",
      expiry: "7 days",
    },
    {
      name: "Yogurt",
      image: "https://via.placeholder.com/150",
      expiry: "10 days",
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
