"use client";
import React, { useState } from "react";

const Page = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/meaning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word }),
    });

    const data = await res.json();
    setResult(data.meaning);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {result && <p><b>Meaning:</b> {result}</p>}
    </div>
  );
};

export default Page;
