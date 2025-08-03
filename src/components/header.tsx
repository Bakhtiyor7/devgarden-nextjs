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
        <div className={"right-container"} style={{ position: "relative" }}>
          <Image
            src="/header-image.png"
            width={474}
            height={426}
            priority
            alt="header-image"
            style={{
              objectFit: "contain",
              transform: "translateX(65px)", // Move the image 50px to the right
            }}
          />
          <img
            src="/glitch.gif"
            alt="glitch-overlay"
            style={{
              position: "absolute",
              top: "195px", // Fine-tuned to match the screen position
              left: "228px", // Fine-tuned to center on the screen
              width: "105px", // Match the GIF's actual dimensions
              height: "77px", // Match the GIF's actual dimensions
              pointerEvents: "none",
              opacity: 0.7, // Make it semi-transparent for better blending
              mixBlendMode: "screen", // Blend mode for better transparency effect
            }}
          />
        </div>
      </div>
      <div className="header-bottom"></div>
    </div>
  );
};

export default Header;
