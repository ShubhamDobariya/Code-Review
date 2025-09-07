import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  const [code, setCode] = useState(``);

  const [review, setReview] = useState(``);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll(`function sum(a,b){
                    return a + b;                  
                  }`);
  }, []);

  useEffect(() => {
    if (code.trim() === "") {
      setReview("");
    }
  }, [code]);

  async function reviewCode() {
    try {
      setLoading(true);
      setReview("");
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (e) {
      setReview("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
