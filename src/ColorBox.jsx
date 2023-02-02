import "./styles/ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import chroma from "chroma-js";
import { Link } from "react-router-dom";
const ColorBox = ({
  background,
  name,
  colorId,
  PaletteId,
  showingFullPalette,
}) => {
  const [copied, setCopied] = useState(false);
  // if (!copied) document.body.classList.add("overflow-hidden");
  const changeCopyState = () => {
    document.body.classList.add("overflow-hidden");
    setCopied(true);
    setTimeout(() => {
      document.body.classList.remove("overflow-hidden");
      setCopied(false);
    }, 1500);
  };
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div
        style={{ background }}
        className={`ColorBox ${showingFullPalette && "showingFullPalette"}`}
      >
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background }}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied !</h1>
          <p className={isLightColor ? "dark-text" : ""}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor ? "dark-text" : ""}`}>
            Copy
          </button>
        </div>
        {showingFullPalette && (
          <Link
            to={`/palette/${PaletteId}/${colorId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
