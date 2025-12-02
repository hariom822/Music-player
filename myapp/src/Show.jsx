
import { useEffect, useState } from "react";

export default function ArtistSingles() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(
      "https://spotify23.p.rapidapi.com/artist_singles/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=20",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "3fdabbe6f9msh04a81772394c299p1bd6f2jsn9dec34b8bcfe",
          "x-rapidapi-host": "spotify23.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("API DATA:", json);
        setData(json);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data");
      });
  }, []);

  return (
    <div
      style={{
        background: "#121212",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1>Artist Singles Data</h1>

      {error && <p>{error}</p>}

      {!data ? (
        <p>Loading...</p>
      ) : (
        <pre
          style={{
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "10px",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
