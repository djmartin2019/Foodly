#!/usr/bin/env node

/**
 * Convert SVG to PNG for Open Graph image
 * This script converts the og-image.svg to og-image.png
 *
 * Requirements: npm install sharp
 * Usage: node scripts/generate-og-image.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if sharp is available
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (error) {
  console.log("⚠️  Sharp not found. Installing...");
  console.log("Run: npm install sharp");
  console.log("Then run this script again.");
  process.exit(1);
}

async function generateOGImage() {
  try {
    const svgPath = path.join(__dirname, "../public/og-image.svg");
    const pngPath = path.join(__dirname, "../public/og-image.png");

    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error("❌ og-image.svg not found at:", svgPath);
      return;
    }

    // Convert SVG to PNG
    await sharp(svgPath).resize(1200, 630).png().toFile(pngPath);

    console.log("✅ Generated og-image.png successfully!");
    console.log("📁 Location:", pngPath);
  } catch (error) {
    console.error("❌ Error generating OG image:", error.message);
  }
}

generateOGImage();
