import React from "react"
import Logo from "../../assets/images/logo.png"
const Link = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

const Header = () => (
    <div style={{ background: "rgba(34,34,34,.8)", marginBottom: "1.45rem" }}>
        <div
            style={{
                margin: "0 auto",
                maxWidth: 960,
                padding: "1.45rem 1.0875rem"
            }}
        >
            <Link to="/" style={{ margin: 0 }}>
                <img
                    src={Logo}
                    style={{ width: "36px", display: "inline", margin: 0 }}
                    alt="Logo"
                />
                <h1 style={{ color: "#f78153", display: "inline" }}>Recipe</h1>
                <h1 style={{ color: "#51d466", display: "inline" }}>Shelf</h1>
            </Link>
            <div style={{ float: "right" }}>
                <Link to="/collections" style={{ padding: "1rem" }}>
                    Collections
                </Link>
                <Link to="/cuisines" style={{ padding: "1rem" }}>
                    Cuisines
                </Link>
            </div>
        </div>
    </div>
)

export default Header
