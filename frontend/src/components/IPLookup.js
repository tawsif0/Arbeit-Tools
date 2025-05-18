// components/IPLookup.js
import React, { useState } from "react";
import axios from "axios";

const IPLookup = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const lookupIP = async () => {
    if (!ip.trim()) {
      setError("Please enter an IP address.");
      setResult(null);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/ip/lookup", {
        ip
      });
      setResult(res.data);
      setError("");
    } catch {
      setError("Lookup failed.");
      setResult(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>IP Lookup</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter IP address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button className="btn btn-primary" onClick={lookupIP}>
        Lookup
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {result && (
        <pre
          className="bg-light p-3 mt-3 rounded"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {JSON.stringify(result, null, 4)}
        </pre>
      )}
    </div>
  );
};

export default IPLookup;
