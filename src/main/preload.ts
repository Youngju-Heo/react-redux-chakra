import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/renderer";

contextBridge.exposeInMainWorld("electronApi", {
  setMessage: (message: string) => {
    ipcRenderer.send("cli-message", message);
  },
  handleMessage: (callback: (event: IpcRendererEvent, message: string) => void) =>
    ipcRenderer.on("srv-message", callback),
  asyncGetTime: () => ipcRenderer.invoke("cli-get-time"),
});
