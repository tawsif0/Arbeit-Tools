// Home.js
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const tools = [
    {
      name: "Unit Converter",
      path: "/unit-converter",
      icon: "📏",
      description: "Convert between various measurement units"
    },
    // {
    //   name: "PDF Converter",
    //   path: "/pdf-converter",
    //   icon: "📄",
    //   description: "Convert PDF files to other formats",
    // },
    {
      name: "Image Converter",
      path: "/image-converter",
      icon: "🖼️",
      description: "Convert between image formats"
    },
    {
      name: "Hex to RGB Converter",
      path: "/hex-to-rgb",
      icon: "🎨",
      description: "Convert color codes between HEX and RGB"
    },
    {
      name: "JSON Formatter",
      path: "/json-formatter",
      icon: "📦",
      description: "Beautify and validate JSON data"
    },
    {
      name: "HTML Encoder/Decoder",
      path: "/html-encoder-decoder",
      icon: "🔣",
      description: "Encode/decode HTML entities"
    },
    {
      name: "Base64 Encoder/Decoder",
      path: "/base64-encoder-decoder",
      icon: "🔢",
      description: "Encode/decode Base64 strings"
    },
    {
      name: "QR Code Generator",
      path: "/qr-code-generator",
      icon: "🔳",
      description: "Generate custom QR codes"
    },
    {
      name: "Meta Tag Generator",
      path: "/meta-tag-generator",
      icon: "🏷️",
      description: "Create SEO-friendly meta tags"
    },
    {
      name: "Word & Character Counter",
      path: "/word-character-counter",
      icon: "📝",
      description: "Count words and characters"
    },
    {
      name: "Age Calculator",
      path: "/age-calculator",
      icon: "🎂",
      description: "Calculate age from birth date"
    },
    {
      name: "BMI Calculator",
      path: "/bmi-calculator",
      icon: "⚖️",
      description: "Calculate Body Mass Index"
    },
    {
      name: "Love Calculator",
      path: "/love-calculator",
      icon: "💖",
      description: "Calculate love compatibility"
    },
    {
      name: "GPA Calculator",
      path: "/gpa-calculator",
      icon: "📚",
      description: "Calculate Grade Point Average"
    },
    {
      name: "IP Lookup",
      path: "/ip-lookup",
      icon: "🌐",
      description: "Get IP address information"
    },
    {
      name: "PDF to Word Converter",
      path: "/pdf-to-word-converter",
      icon: "📑",
      description: "Convert PDF documents to Word format"
    }
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Arbeit Tools</h1>
        <p className="home-subtitle">
          Your Ultimate Development Utilities Collection
        </p>
      </div>

      <div className="tools-grid my-5">
        {tools.map((tool, index) => (
          <Link to={tool.path} key={index} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-description">{tool.description}</p>
            <div className="tool-cta">
              Use Tool
              <span className="cta-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
