import React from "react";

const Header = props => {
  return (
    <header>
      <div className="header">
        <span>{props.title}</span>
      </div>

      <div className="subheader-body">
        <span className="subheader">
          {" "}
          Powered by{" "}
          <a
            className="link"
            target="nooperner"
            href="https://www.coindesk.com/price"
          >
            coindesk
          </a>
          .{" "}
        </span>
      </div>
    </header>
  );
};

export default Header;
