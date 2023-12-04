import styled from "styled-components";
import Logo from "../components/Logo";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper className="container">
      <nav>
        <Logo />
      </nav>
      <div className="page">
        <div>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <div>
          <img src={main} alt="main" className="img main-img" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width); // 90vw
    max-width: var(--max-width); //1120px maximum width in big screen
    margin: 0 auto;
    height: var(--nav-height); //6rem
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--red-dark);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
