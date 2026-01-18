module.exports = {
  // Format và lint TypeScript/JavaScript files
  "*.{js,jsx,ts,tsx}": (files) => {
    const filtered = files.filter((file) => !file.includes("scripts/"));

    // Nếu không có file nào sau khi filter, return empty array
    if (filtered.length === 0) return [];

    return [
      `prettier --write ${filtered.join(" ")}`,
      `eslint --fix ${filtered.join(" ")}`,
    ];
  },
  // Format JSON, CSS, và các file khác
  "*.{json,css,scss,md,mdx}": ["prettier --write"],
};
