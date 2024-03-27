import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://secrets-backend-36fn.onrender.com/api/quotes", {
        content,
      });
      setContent("");

      navigate("/");
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  };

  return (
    <div className="QuoteForm">
      <br />
      <br />
      <h1>Submit Secret Quote</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your secret quote"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit Quote</button>
      </form>
    </div>
  );
}
export default Post;
