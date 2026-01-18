#!/usr/bin/env node

/**
 * Script to add shadcn component and organize it into its own folder
 * Usage: node scripts/add-component.js <component-name>
 * Example: node scripts/add-component.js button
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Please provide a component name");
  console.log("Usage: node scripts/add-component.js <component-name>");
  process.exit(1);
}

const atomsDir = path.join(process.cwd(), "components", "atoms");
const componentFile = path.join(atomsDir, `${componentName}.tsx`);
const componentDir = path.join(atomsDir, componentName);
const indexFile = path.join(componentDir, "index.tsx");

try {
  console.log(`📦 Adding shadcn component: ${componentName}...`);
  
  // Run shadcn add command
  execSync(`npx shadcn@latest add ${componentName} --yes`, {
    stdio: "inherit",
    cwd: process.cwd(),
  });

  // Check if component file was created
  if (!fs.existsSync(componentFile)) {
    console.error(`❌ Component file not found: ${componentFile}`);
    console.log("💡 The component might have been created with a different name or location.");
    process.exit(1);
  }

  // Create component directory
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`📁 Created directory: ${componentDir}`);
  }

  // Read the component file content
  const componentContent = fs.readFileSync(componentFile, "utf-8");

  // Write to index.tsx in the component directory
  fs.writeFileSync(indexFile, componentContent, "utf-8");
  console.log(`✅ Created: ${indexFile}`);

  // Delete the original file
  fs.unlinkSync(componentFile);
  console.log(`🗑️  Removed: ${componentFile}`);

  console.log(`\n✨ Component ${componentName} has been organized into: components/atoms/${componentName}/`);
  console.log(`📝 Import it like: import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from "@/components/atoms/${componentName}"`);
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
