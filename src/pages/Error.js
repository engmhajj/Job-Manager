import { Link } from "react-router-dom";
import image from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={image} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page that you are looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
