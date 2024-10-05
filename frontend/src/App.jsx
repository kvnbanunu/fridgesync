// src/App.jsx
import React from "react";

function App() {
  return (
    <div className="app-container">
      <Nav />
      <div className="main-content">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>My React App</h1>
    </header>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <h2 className="nav-title">FridgeSync</h2>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

function Body() {
  return (
    <main className="body">
      <h2>Welcome to my React app!</h2>
      <p>This is a basic React page with a header, nav, body, and footer.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 My React App</p>
    </footer>
  );
}

export default App;
