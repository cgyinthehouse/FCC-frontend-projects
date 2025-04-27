import {
  FaQuoteLeft,
  FaQuoteRight,
  FaXTwitter,
  FaThreads
} from "react-icons/fa6";
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
      setQuote(quote["0"].quote);
      setAuthor(quote["0"].author);
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
                  delay: 40
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
                  "https://twitter.com/intent/tweet?hashtags=breakingbad&related=freecodecamp&text=" +
                  encodeURIComponent(`"${quote}" ${author}`)
                }
                target="_blank"
              >
                <FaXTwitter />
              </a>
              <a
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
                  author
                )}&content=${encodeURIComponent(
                  quote
                )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                target="_blank"
              >
                <FaThreads />
              </a>
            </div>
            <button id="new-quote" onClick={changeQuote}>
              <IoCaretForwardCircle size={35} />
            </button>
          </div>
        </div>
        <div id="footer">
          <p>Quotes from Breaking Bad</p>
          <p>
            Made by{" "}
            <a href="https://github.com/cgyinthehouse">@cgyinthehouse</a> with a
            shoutout to this{" "}
            <a href="https://github.com/shevabam/breaking-bad-quotes?tab=readme-ov-file">
              API
            </a>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
