import Header from "./Header";
import Nav from "./Nav";
import Body from "./Body";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="app-container">
        <Nav></Nav>
        <div className="main-content">
          <Header></Header>
          <Body></Body>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default App;
