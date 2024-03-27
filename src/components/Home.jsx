import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import RingLoader from "react-spinners/RingLoader";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://secrets-backend-36fn.onrender.com/api/quotes"
      );
      setQuotes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  function formatDateToString(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className="quote">
      <br />
      <br />
      <h1>Secret Quotes</h1>

      {isLoading && (
        <div className="load">
          <RingLoader />
        </div>
      )}
      <div className="row">
        {quotes.map((quote) => (
          <div key={quote._id} className="col-md-4 mb-4">
            <div className="card quotes">
              <div className="card-body">
                <p className="text card-text">{quote.content}</p>
              </div>

              <p className="card-footer date">
                {formatDateToString(quote.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
