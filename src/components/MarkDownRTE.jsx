import { useState } from "react";
import { Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [isMarkdown, setIsMarkdown] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsMarkdown((prev) => !prev)}
        className="mb-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {isMarkdown ? "Switch to Editor" : "Switch to Markdown Preview"}
      </button>
      <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm transition-all duration-300">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            isMarkdown ? (
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <ReactMarkdown>{value}</ReactMarkdown>
              </div>
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
