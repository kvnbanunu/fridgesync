import PropTypes from "prop-types";

const Gallery = ({ items }) => {
  return (
    <div className="gallery-container">
      <div className="ingredients-column">
        <h2>Ingredients</h2>
        {items.map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={item.image} alt={item.name} className="gallery-img" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="expiry-column">
        <h2>Estimated Expiry</h2>
        {items.map((item, index) => (
          <div className="expiry-item" key={index}>
            <p>{item.expiry}</p>
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
