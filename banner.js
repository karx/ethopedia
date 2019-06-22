const fs = require("fs");
const pkg = require("./package.json");
const filename = "assets/js/main.min.js";
const script = fs.readFileSync(filename);
const padStart = str => ("0" + str).slice(-2);
const dateObj = new Date();
const date = `${dateObj.getFullYear()}-${padStart(
  dateObj.getMonth() + 1
)}-${padStart(dateObj.getDate())}`;
const banner = `/*!
 * Akriya Technologies ${pkg.version} by ${pkg.author}
 * Copyright 2017-${dateObj.getFullYear()} Akriya Technologies - akriya.co.in | @karx01
 * Licensed under ${pkg.license}
 */
`;

if (script.slice(0, 3) != "/**") {
  fs.writeFileSync(filename, banner + script);
}
