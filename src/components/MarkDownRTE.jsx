import { useState } from "react";
import { Controller } from "react-hook-form";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [selectedTab, setSelectedTab] = useState("write");
  const [isMarkdown, setIsMarkdown] = useState(false);
  const converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <button 
        type="button" // Prevents form submission
        onClick={(e) => {
          e.preventDefault(); // Stop unintended form submission
          setIsMarkdown((prev) => !prev);
        }}
        className="mb-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {isMarkdown ? "Switch to Normal Editor" : "Switch to Markdown Editor"}
      </button>
      <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:border-orange-300 dark:hover:border-orange-400 transition-all duration-300">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            isMarkdown ? (
              <ReactMde
                value={value}
                onChange={onChange}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
                className="rounded-lg backdrop-blur-sm bg-white/70 dark:bg-gray-800/80"
              />
            ) : (
              <textarea
                value={value}
                onChange={onChange}
                className="w-full h-40 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter content..."
              />
            )
          )}
        />
      </div>
    </div>
  );
}
