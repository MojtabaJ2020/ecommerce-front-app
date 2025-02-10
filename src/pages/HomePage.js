import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/baners/Navbar';
import Footer from './../components/baners/Footer';
import './../styles/HomePage.css';
import clothes from './../assets/clothes.jpg';
import electronics from './../assets/electronics.jpg';
import homeGoods from './../assets/home-goods.jpg';

function HomePage() {
  return (
    <div className="index-page">

      {/* <Navbar /> */}

      <section className="categories-section">
        <h2>Welcome to Our E-Commerce Store!</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src={clothes} alt="Clothes" />
            <h3>Clothes</h3>
            <Link to="/category/clothes" className="cta-btn">Shop Now</Link>
          </div>
          <div className="category-card">
            <img src={electronics} alt="Electronics" />
            <h3>Electronics</h3>
            <Link to="/category/electronics" className="cta-btn">Shop Now</Link>
          </div>
          <div className="category-card">
            <img src={homeGoods} alt="Home Goods" />
            <h3>Home Goods</h3>
            <Link to="/category/home" className="cta-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
