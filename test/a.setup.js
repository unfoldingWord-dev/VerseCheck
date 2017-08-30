require("babel-register")({
  extensions: [".js", ".jsx"],
  presets: ["es2015", "react"],
  plugins: ["transform-object-rest-spread"]
});
