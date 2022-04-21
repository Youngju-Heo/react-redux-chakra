/* eslint-disable no-console */
// src/electron.js
import path from "path";
import { app, BrowserWindow } from "electron";

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  }); // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "render/index.html")).catch((err) => {
    console.error(err);
  });
}

app.on("ready", createWindow);
