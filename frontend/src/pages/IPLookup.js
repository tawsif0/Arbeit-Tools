import React, { useState } from "react";
import axios from "axios";
import "./IPLookup.css";
const IPLookup = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Regex to validate the IP address format
  const isValidIP = (ip) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const lookupIP = async () => {
    if (!ip.trim()) {
      setError("Please enter an IP address.");
      setResult(null);
      return;
    }

    if (!isValidIP(ip)) {
      setError("Please enter a valid IP address.");
      setResult(null);
      return;
    }

    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/ip/lookup", {
        ip,
      });

      if (res.data.message) {
        setResult({ message: res.data.message });
      } else {
        setResult(res.data);
      }

      setError("");
    } catch {
      setError("Lookup failed.");
      setResult(null);
    }
  };

  return (
    <div className="ip-lookup my-5">
      <div className="ip-header">
        <h2 className="ip-title">IP Lookup</h2>
        <p className="ip-subtitle">Uncover the secrets behind any IP address</p>
      </div>

      <div className="ip-input-group">
        <input
          type="text"
          className="ip-input"
          placeholder="Enter IP address..."
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button className="ip-button" onClick={lookupIP}>
          <span className="ip-button-text">Investigate</span>
          <span className="ip-button-icon">🕵️♂️</span>
        </button>
      </div>

      {error && (
        <div className="json-alert json-alert-error">
          <span className="json-alert-icon">⚠️</span> {error}
        </div>
      )}

      {result && (
        <div className="ip-results">
          {result.message ? (
            <div className="ip-alert ip-alert-warning">{result.message}</div>
          ) : (
            <>
              <div className="ip-results-header">
                <h3 className="ip-results-title">Investigation Report</h3>
                <div className="ip-address-badge">{result.ip}</div>
              </div>

              <div className="ip-results-grid">
                <div className="ip-result-card">
                  <span className="ip-result-label">Location</span>
                  <span className="ip-result-value">
                    {result.city}, {result.region}, {result.country}
                  </span>
                </div>

                <div className="ip-result-card">
                  <span className="ip-result-label">Coordinates</span>
                  <span className="ip-result-value">{result.loc}</span>
                </div>

                <div className="ip-result-card">
                  <span className="ip-result-label">Hostname</span>
                  <span className="ip-result-value">{result.hostname}</span>
                </div>

                <div className="ip-result-card">
                  <span className="ip-result-label">Timezone</span>
                  <span className="ip-result-value">{result.timezone}</span>
                </div>

                <div className="ip-result-card">
                  <span className="ip-result-label">Organization</span>
                  <span className="ip-result-value">{result.org}</span>
                </div>

                <div className="ip-result-card">
                  <span className="ip-result-label">Anycast</span>
                  <span className="ip-result-value">
                    {result.anycast ? "✅ Detected" : "❌ Not detected"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IPLookup;
