import PropTypes from "prop-types";

const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div className="gallery-item" key={index}>
          <img
            src={image}
            alt={`Gallery item ${index + 1}`}
            className="gallery-img"
          />
        </div>
      ))}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Main App component with images array
function App() {
  const images = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/500",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/700",
  ];

  return (
    <div className="App">
      <h2>Fridge</h2>
      <Gallery images={images} />
    </div>
  );
}

export default App;
