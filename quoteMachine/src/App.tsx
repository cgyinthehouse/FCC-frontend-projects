import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
import { IoCaretForwardCircle } from "react-icons/io5";
import { useState, useLayoutEffect } from "react";
import { getQuote } from "./libs/getquote";
import randomColor from "./libs/randomColor";
import Typewriter from "typewriter-effect";
import "./sass/App.css";
function App() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const changeColor = () => {
    setColor(randomColor());
  };

  const changeQuote = () => {
    getQuote().then((quote) => {
      setQuote(quote[0].content);
      setAuthor(quote[0].author);
    });
    changeColor();
  };

  useLayoutEffect(() => {
    changeQuote();
  }, []);

  return (
    <>
      <div id="wrapper" style={{ backgroundColor: color }}>
        <div id="quote-box">
          <div id="quote-text" style={{ color: color }}>
            <div id="text">
              <FaQuoteLeft />
              <Typewriter
                options={{
                  strings: quote,
                  autoStart: true,
                  delay: 40,
                }}
              />
              <FaQuoteRight />
            </div>
          </div>
          <p style={{ color: color }} id="author">
            {author}
          </p>
          <div className="buttons">
            <div>
              <a
                id="tweet-quote"
                href={
                  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                  encodeURIComponent(`"${quote}" ${author}`)
                }
                target="_blank"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
                  author
                )}&content=${encodeURIComponent(
                  quote
                )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                target="_blank"
              >
                <FaTumblr />
              </a>
            </div>
            <button id="new-quote" onClick={changeQuote}>
              <IoCaretForwardCircle size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
