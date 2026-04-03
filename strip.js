const fs = require("fs");
const strip = require("strip-comments");
const glob = require("glob");

glob("**/*.{js,jsx}", { ignore: "node_modules/**" }, (err, files) => {
  files.forEach((file) => {
    let code = fs.readFileSync(file, "utf8");
    let stripped = strip(code);
    fs.writeFileSync(file, stripped);
  });
});
