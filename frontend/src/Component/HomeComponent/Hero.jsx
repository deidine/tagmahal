import React from 'react';

export const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">Découvrez l'Élégance à Chaque Détail</p>
            <h2 className="h1 hero-title">
              Bienvenue à <span className="span">Notre Boutique</span> en Ligne
            </h2>
            <p className="hero-text">
              Explorez notre collection exclusive de produits de qualité supérieure. 
              Des articles uniques pour chaque occasion, avec des offres spéciales en ligne seulement.
            </p>
            <a href="/shop" className="btn btn-primary">
              <span className="span">Shoppez Maintenant</span>
              <ion-icon name="chevron-forward" aria-hidden="true" />
            </a>
            
          </div>
          <figure className="hero-banner">
            <img
             src="./images/ecommrce2.png"

              width={803}
              height={834}
              loading="lazy"
              alt="Produits"
              className="w-100"
            />
          </figure>
        </div>
      </section>
    </>
  );
};
