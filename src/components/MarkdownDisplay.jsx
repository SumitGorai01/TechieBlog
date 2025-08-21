// src/components/MarkdownDisplay.js
import MDEditor from "@uiw/react-md-editor";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useSelector } from "react-redux";

export default function MarkdownDisplay({ content }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-8"
      data-color-mode={darkMode ? "dark" : "light"}
    >
      <MDEditor.Markdown
        source={content}
        rehypePlugins={[
          rehypeSlug, // 🟢 adds id to headings
          [rehypeAutolinkHeadings, { behavior: "append" }], // optional: clickable anchor links
        ]}
        style={{
          color: darkMode ? "rgb(209, 213, 219)" : "rgb(21, 21, 21)",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          backgroundColor: darkMode ? "#2d3748" : "rgb(249 250 251)",
          borderRadius: darkMode ? "0.75rem" : "0.5rem",
          padding: "2.5rem",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
}
