const { execSync } = require("child_process");
const os = require("os");
const fs = require("fs");
const { randomUUID } = require("crypto");

const tempDir = os.tmpdir();
const currentPath = process.cwd();
const tempProjectName = `cra-temp-${randomUUID()}`;
const destPath = `${tempDir}/${tempProjectName}`;

const templateJSONBuilder = ({ dependencies, devDependencies }) => {
  return JSON.stringify(
    JSON.parse(`{
    "package": {
      "dependencies": ${JSON.stringify(dependencies)},
      "eslintConfig": {
        "extends": ["react-app", "react-app/jest"]
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "devDependencies": ${JSON.stringify(devDependencies)}
    }
  }`),
    null,
    2
  );
};

async function main() {
  console.log("Basic CRA setup...");
  process.chdir(tempDir);
  execSync(`npx create-react-app ${tempProjectName} --template typescript`);
  process.chdir(destPath);
  console.log("Installing dependencies...");
  execSync("npm install");
  console.log("Installing tailwind dependencies...");
  execSync("npm install -D tailwindcss postcss autoprefixer");

  const packageJSONFile = JSON.parse(
    fs.readFileSync(`${destPath}/package.json`, {
      encoding: "utf-8",
    })
  );

  console.log("Got data from package.json...");

  const templateJSON = templateJSONBuilder({
    dependencies: packageJSONFile.dependencies,
    devDependencies: packageJSONFile.devDependencies,
  });

  process.chdir(currentPath);

  fs.writeFileSync("template.json", templateJSON, {
    encoding: "utf-8",
  });

  console.log("Write to template.json...");

  console.log(templateJSON);

  fs.rmSync(destPath, { recursive: true, force: true });

  console.log("Succes!");
}

main();
