module.exports = {
  // Format và lint TypeScript/JavaScript files
  "*.{js,jsx,ts,tsx}": (files) => {
    // Lọc bỏ files trong scripts/
    const filtered = files.filter((file) => !file.includes("scripts/"));
    return [
      `prettier --write ${filtered.join(" ")}`,
      `eslint --fix ${filtered.join(" ")}`,
    ];
  },
  // Format JSON, CSS, và các file khác
  "*.{json,css,scss,md,mdx}": ["prettier --write"],
};
