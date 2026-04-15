const { spawn } = require("child_process");
const path = require("path");

const rootDir = __dirname;
const clientDir = path.join(rootDir, "client");

const server = spawn("node", [`"${path.join(rootDir, "server", "index.js")}"`], {
  stdio: "inherit",
  cwd: rootDir,
  env: { ...process.env },
  shell: true,
});

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const client = spawn(npmCmd, ["run", "dev"], {
  stdio: "inherit",
  cwd: clientDir,
  shell: true,
});

server.on("close", (code) => console.log(`Server exited: ${code}`));
client.on("close", (code) => console.log(`Client exited: ${code}`));

process.on("SIGTERM", () => {
  server.kill();
  client.kill();
});
process.on("SIGINT", () => {
  server.kill();
  client.kill();
});
