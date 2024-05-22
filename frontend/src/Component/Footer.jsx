import React from 'react'

export const Footer = () => {
  return (
    <>
      <footer id='contact' className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-brand">
              <a href="/" className="logo">
                Organ<span className="span">ica</span>
              </a>
              <p className="footer-text">
                Elle est devenue populaire dans les années 1960 avec la sortie des feuilles Letraset contenant des passages de Lorem Ipsum, et plus récemment avec des logiciels de publication de bureau comme y compris.
              </p>
              <ul className="social-list">
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-skype" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Entreprise</p>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  À Propos
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link">
                  Boutique
                </a>
              </li>
              <li>
                <a href="/blog" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link">
                  Produit
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contactez-nous
                </a>
              </li>
            </ul>
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Contact</p>
              </li>
              <li className="footer-item">
                <div className="contact-icon">
                  <ion-icon name="location-outline" />
                </div>
                <address className="contact-link">
                  7 rue Green Lake, Crawfordsville, IN 47933
                </address>
              </li>
              <li className="footer-item">
                <div className="contact-icon">
                  <ion-icon name="call-outline" />
                </div>
                <a href="tel:+1800123456789" className="contact-link">
                  +1 800 123 456 789
                </a>
              </li>
              <li className="footer-item">
                <div className="contact-icon">
                  <ion-icon name="mail-outline" />
                </div>
                <a href="mailto:organica@help.com" className="contact-link">
                  organica@help.com
                </a>
              </li>
            </ul>
            <div className="footer-list">
              <p className="footer-list-title">Newsletter</p>
              <p className="newsletter-text">
                Vous serez averti lorsque quelque chose de nouveau apparaîtra.
              </p>
              <form action="" className="footer-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail *"
                  required=""
                  className="footer-input"
                />
                <button
                  type="submit"
                  className="footer-form-btn"
                  aria-label="Envoyer"
                >
                  <ion-icon name="mail-outline" />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">
              © 2022{" "}
              <a href="#" className="copyright-link">
                vivekkakadiya
              </a>
              . Tous droits réservés.
            </p>
            <ul className="footer-bottom-list">
              <li>
                <a href="#" className="footer-bottom-link">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="footer-bottom-link">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
