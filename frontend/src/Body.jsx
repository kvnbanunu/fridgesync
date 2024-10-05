import Fridge from "./Fridge";
import Recipes from "./Recipes";
import CarouselComponent from './Carousel'

function Body() {
  return (
    <main className="body">
      <h2>Welcome to my React app!</h2>
      <p>This is a basic React page with a header, nav, body, and footer.</p>
      <Fridge></Fridge>
      <Recipes></Recipes>
      <CarouselComponent></CarouselComponent>
    </main>
  );
}

export default Body;
