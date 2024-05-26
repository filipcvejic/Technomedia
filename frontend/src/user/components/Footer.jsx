import AmericanExpressIcon from "../svgs/AmericanExpressIcon";
import BinanceIcon from "../svgs/BinanceIcon";
import CoinbaseIcon from "../svgs/CoinbaseIcon";
import GitHubIcon from "../svgs/GitHubIcon";
import InstagramIcon from "../svgs/InstagramIcon";
import LinkedInIcon from "../svgs/LinkedInIcon";
import MasterCardIcon from "../svgs/MasterCardIcon";
import PaypalIcon from "../svgs/PaypalIcon";
import VisaIcon from "../svgs/VisaIcon";
import YoutubeIcon from "../svgs/YoutubeIcon";
import Logo from "../svgs/Logo";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="top-footer-wrapper">
        <div className="top-footer-content">
          <div className="top-footer-logo">
            <Logo />
          </div>
          <div className="contact-us-column">
            <h4>Contact Us</h4>
            <p>Address: Dalmatinska 166, Sabac, Serbia</p>
            <p>Phone: +38166370577</p>
            <p>
              Email:{" "}
              <a href="mailto:info@filipcvejic.com">info@filipcvejic.com</a>
            </p>
          </div>
          <div className="connect-with-us-column">
            <h4>Connect With Us</h4>
            <ul className="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/filip.cvejic"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/vasprofil"
                  target="_blank"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/filipcvejic" target="_blank">
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/user/vasprofil"
                  target="_blank"
                >
                  <YoutubeIcon />
                </a>
              </li>
            </ul>
          </div>
          <div className="newsletter-column">
            <h4>Subscribe to the Newsletter</h4>
            <form className="subscribe-newsletter">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-cards-wrapper">
        <ul className="footer-cards-content">
          <li>
            <a
              href="https://rs.visa.com/run-your-business/small-business-tools/payment-technology/visa-secure.html"
              rel="noindex nofollow"
              target="_blank"
            >
              <VisaIcon />
            </a>
          </li>
          <li>
            <a
              href="https://www.mastercard.rs/sr-rs/korisnici/podrska/sigurnost-i-zastita/identity-check.html"
              rel="noindex nofollow"
              target="_blank"
            >
              <MasterCardIcon />
            </a>
          </li>

          <li>
            <a
              href="https://www.americanexpress.com/"
              rel="noindex nofollow"
              target="_blank"
            >
              <AmericanExpressIcon />
            </a>
          </li>
          <a
            href="https://www.paypal.com/"
            rel="noindex nofollow"
            target="_blank"
          >
            <PaypalIcon />
          </a>
          <li>
            <a
              href="https://www.coinbase.com/"
              rel="noindex nofollow"
              target="_blank"
            >
              <CoinbaseIcon />
            </a>
          </li>
          <li>
            <a
              href="https://www.binance.com/"
              rel="noindex nofollow"
              target="_blank"
            >
              <BinanceIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright-wrapper">
        <small className="copyright-content">
          <p className="rights">
            <span>© 2024 Technomedia. All rights reserved</span>
          </p>
          <p className="author">
            <span>Designed & developed by: Filip Cvejic</span>
          </p>
        </small>
      </div>
    </div>
  );
}

export default Footer;
