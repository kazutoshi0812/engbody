#!/usr/bin/env node
/**
 * SCSS内の px を rem に変換 (16px = 1rem)
 * 例: 16px → 1rem, 8px → 0.5rem
 */
const fs = require("fs");
const path = require("path");

const cssDir = path.join(__dirname, "..", "css");

function pxToRem(match, num) {
  const value = parseFloat(num);
  if (value === 0) return "0";
  const rem = Math.round((value / 16) * 10000) / 10000;
  return `${rem}rem`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const pattern = /(\d+(?:\.\d+)?)px/g;
  const newContent = content.replace(pattern, pxToRem);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, "utf8");
    return true;
  }
  return false;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      count += walkDir(full);
    } else if (e.name.endsWith(".scss")) {
      if (processFile(full)) count++;
    }
  }
  return count;
}

const n = walkDir(cssDir);
console.log(`Converted px to rem in ${n} SCSS file(s).`);
