import Fridge from "./Fridge";
import Recipes from "./Recipes";

function Body() {
  return (
    <main className="body">
      <h2>Welcome to my React app!</h2>
      <p>This is a basic React page with a header, nav, body, and footer.</p>
      <Fridge></Fridge>
      <Recipes></Recipes>
    </main>
  );
}

export default Body;
