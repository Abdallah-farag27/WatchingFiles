const chokidar = require("chokidar");
const path = require("path");

const logFilePath = path.join(process.cwd(), "folder");

const watcher = chokidar.watch(logFilePath, {
  persistent: true,
  ignoreInitial: true,
});
const displayChange = (message) => {
  const timestamp = new Date();
  const day = `${timestamp.getDate()}`.padStart(2, "0");
  const month = `${timestamp.getMonth()}`.padStart(2, "0");
  const date = `[${day}/${month}/${timestamp.getFullYear()} at ${timestamp.getHours()}:${timestamp.getMinutes()}]`;
  const logMessage = `${date} ${message}\n`;
  console.log(logMessage);
};

watcher
  .on("add", (path) => displayChange(`File [${path}] has been added`))
  .on("change", (path, details) =>
    displayChange(`File ${path} has been changed `)
  )
  .on("unlink", (path) => displayChange(`File ${path} has been removed`))
  .on("addDir", (dirPath) =>
    displayChange(`Directory ${dirPath} has been added`)
  )
  .on("unlinkDir", (dirPath) =>
    displayChange(`Directory ${dirPath} has been removed`)
  )
  .on("error", (error) => displayChange(`Watcher error: ${error}`));

console.log("The watch begins");
