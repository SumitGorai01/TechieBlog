// src/utils/postMeta.js
export const getPostMetadata = (content) => {
  const words = content.trim().split(/\s+/).length;
  const minutesToRead = Math.ceil(words / 200);
  return { wordCount: words, minutesToRead };
};
