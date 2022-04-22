/* eslint-disable no-console */
import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1900,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile(path.join(__dirname, "render/index.html")).catch((err) => {
  //   console.error(err);
  // });

  win.loadURL("http://localhost:3000/ds-system/app").catch((err) => {
    console.error(err);
  });

  ipcMain.on("log-status", (e, value) => {
    console.log(value);
  });

  ipcMain.on("cli-message", (e, value) => {
    console.log("cli-message", value);
    win.webContents.send("srv-message", value);
  });
}

// app.on("ready", createWindow);

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  //if (process.platform !== "darwin") app.quit();
  app.quit();
});
