import React from "react";
import Image from "next/image";
import "./styles/header.css"; // Import the CSS file for styling

const Header = () => {
  return (
    <div className={"header"}>
      <div className={"container"}>
        <div className={"left-container"}>
          <div className="header-title">Where Bugs Turn Into Butterflies</div>
          <div className="header-subtitle">
            Dev Garden turns your thoughts into a growing knowledge garden.
            Write, learn, and collaborate—one post at a time.
          </div>
          <button className={"write-button"}>Start Posting</button>
        </div>
        <div className={"right-container"}>
          <Image
            src="/header-image.png"
            width={474}
            height={426}
            priority
            alt="header-image"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
