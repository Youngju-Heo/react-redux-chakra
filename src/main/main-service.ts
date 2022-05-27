/* eslint-disable no-console */
import { BrowserWindow, ipcMain } from "electron";

const getAsyncTime = async (): Promise<string> => {
  return await new Promise<string>((resolve) => {
    setTimeout(() => resolve(new Date().toISOString()), 1000);
  });
};

const SetMainService = (mainWindow: BrowserWindow) => {
  if (!mainWindow) {
    throw new Error("Main window is not defined");
  }

  ipcMain.on("log-status", (e, value) => {
    console.log(value);
  });

  ipcMain.on("cli-message", (e, value) => {
    console.log("cli-message", value);
    mainWindow.webContents.send("srv-message", value);
  });

  ipcMain.handle("cli-get-time", getAsyncTime);
};

export default SetMainService;
