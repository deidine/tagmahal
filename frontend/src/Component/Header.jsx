import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Scroll from "react-scroll";
let Link = Scroll.Link;
export const Header = () => {
  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setislogin(false);
    navigate(`/`);
  };

  return (
    <header className="header" data-header="">
      <div className="nav-wrapper">
        <div className="container">
          <h1 className="h1">
            <a href="/" className="logo">
              Organ<span className="span">ica</span>
            </a>
          </h1>
          <button
            className="nav-open-btn"
            aria-label="Ouvrir le menu"
            data-nav-open-btn=""
          >
            <ion-icon name="menu-outline" />
          </button>
          <nav className="navbar" data-navbar="">
            <button
              className="nav-close-btn"
              aria-label="Fermer le menu"
              data-nav-close-btn=""
            >
              <ion-icon name="close-outline" />
            </button>
            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link">
                  Accueil
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                >
                  À propos
                </Link>
              </li>
              <li>
                <a href="/shop" className="navbar-link">
                  Boutique
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="blog"
                  offset={-30}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="products"
                  offset={-30}
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                >
                  Contact
                </Link>
              </li>
              <a href="/admin" className="navbar-link">
                <ion-icon name="chevron-forward" aria-hidden="true" />{" "}
                <span className="span">Espace Admin</span>
              </a>
            </ul>
          </nav>
          <div className="header-action">
            <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Basculer la recherche"
                data-search-btn=""
              >
                <ion-icon name="search-outline" className="search-icon" />
              </button>
              <div className="input-wrapper">
                <input
                  type="search"
                  name="search"
                  placeholder="Rechercher ici"
                  className="search-input"
                />
                <button
                  className="search-submit"
                  aria-label="Soumettre la recherche"
                >
                  <ion-icon name="search-outline" />
                </button>
              </div>
            </div>
            {!islogin ? (
              <button
                className="header-action-btn"
                aria-label="Ouvrir le panier"
                data-panel-btn="cart"
                onClick={handleRedirect}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>
            ) : (
              <>
                <button
                  className="header-action-btn"
                  aria-label="Ouvrir le panier"
                  data-panel-btn="cart"
                  onClick={handleRedirect}
                >
                  <ion-icon name="basket-outline" />
                  <data className="btn-badge" value={2}>
                    02
                  </data>
                </button>
              </>
            )}
            {islogin ? (
              <button
                className="header-action-btn"
                aria-label="Déconnexion"
                data-panel-btn="cart"
                onClick={handleLogout}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
