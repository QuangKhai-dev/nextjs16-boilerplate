#!/usr/bin/env node

/**
 * Script to add all shadcn/ui components at once
 * Usage: node scripts/add-all-components.js
 * Or: npm run add:all-components
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// List of all available shadcn/ui components (as of 2024)
const allComponents = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "combobox",
  "command",
  "context-menu",
  "data-table",
  "date-picker",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "hover-card",
  "input",
  "input-otp",
  "kbd",
  "label",
  "menubar",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle",
  "toggle-group",
  "tooltip",
];

const atomsDir = path.join(process.cwd(), "components", "atoms");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function organizeComponent(componentName) {
  const componentFile = path.join(atomsDir, `${componentName}.tsx`);
  const componentDir = path.join(atomsDir, componentName);
  const indexFile = path.join(componentDir, "index.tsx");

  // Skip if component is already organized
  if (fs.existsSync(componentDir) && fs.existsSync(indexFile)) {
    log(`⏭️  Skipping ${componentName} (already exists)`, "yellow");
    return false;
  }

  // Check if component file exists
  if (!fs.existsSync(componentFile)) {
    // Component might have been created with a different structure
    // Try to find it in subdirectories
    const possiblePaths = [
      path.join(atomsDir, componentName, "index.tsx"),
      path.join(atomsDir, `${componentName}.tsx`),
    ];

    const foundPath = possiblePaths.find((p) => fs.existsSync(p));
    if (foundPath) {
      log(`⏭️  Skipping ${componentName} (already organized)`, "yellow");
      return false;
    }

    log(`⚠️  Component file not found: ${componentName}`, "yellow");
    return false;
  }

  try {
    // Create component directory
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Read the component file content
    const componentContent = fs.readFileSync(componentFile, "utf-8");

    // Write to index.tsx in the component directory
    fs.writeFileSync(indexFile, componentContent, "utf-8");

    // Delete the original file
    fs.unlinkSync(componentFile);

    log(`✅ Organized: ${componentName}`, "green");
    return true;
  } catch (error) {
    log(`❌ Error organizing ${componentName}: ${error.message}`, "red");
    return false;
  }
}

async function addAllComponents() {
  log("\n🚀 Adding all shadcn/ui components...\n", "bright");

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < allComponents.length; i++) {
    const component = allComponents[i];
    const progress = `[${i + 1}/${allComponents.length}]`;

    log(`${progress} 📦 Adding: ${component}`, "cyan");

    try {
      // Run shadcn add command
      execSync(`npx shadcn@latest add ${component} --yes`, {
        stdio: "inherit",
        cwd: process.cwd(),
      });

      // Organize the component
      const organized = organizeComponent(component);
      if (organized) {
        successCount++;
      } else {
        skipCount++;
      }
    } catch (error) {
      log(`❌ Failed to add ${component}: ${error.message}`, "red");
      failCount++;
    }

    // Small delay to avoid rate limiting
    if (i < allComponents.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Summary
  log("\n" + "=".repeat(50), "bright");
  log("📊 Summary:", "bright");
  log(`✅ Success: ${successCount}`, "green");
  log(`⏭️  Skipped: ${skipCount}`, "yellow");
  log(`❌ Failed: ${failCount}`, "red");
  log("=".repeat(50) + "\n", "bright");

  if (failCount > 0) {
    log(
      "💡 Note: Some components might have failed due to dependencies or naming.",
      "yellow"
    );
    log(
      "   You can add them individually using: npm run add:component <name>\n",
      "yellow"
    );
  }

  log("✨ Done! All components have been added and organized.\n", "green");
}

// Run the script
addAllComponents().catch((error) => {
  log(`\n❌ Fatal error: ${error.message}`, "red");
  process.exit(1);
});
