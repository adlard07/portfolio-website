import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FILE_CONTENT_URL =
  "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/get_file_content/personal/";

const Document = () => {
  const { projectName } = useParams();
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.title = `${projectName} | Project Docs`;
  }, [projectName]);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`${FILE_CONTENT_URL}${projectName}`);
        if (!response.ok) throw new Error("Failed to fetch content");
        const data = await response.json();
        setFileContent(typeof data.content === "string" ? data.content : "");
      } catch (err) {
        setError("Something went wrong. Blame the server gremlins.");
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [projectName]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main>
        <div className="p-10 mt-10">
          {loading && <p>Loading... give it a sec 🕒</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              <div>
                <h2 className="text-4xl font-bold">
                  Documentation for{" "}
                  <span className="italic">{projectName.replace(/-/g, " ")}</span>
                </h2>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {fileContent}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Document;
