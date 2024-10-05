import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Nav />
      <Body />
      <Footer />
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
