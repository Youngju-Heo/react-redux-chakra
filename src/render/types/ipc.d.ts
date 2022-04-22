import { IpcRenderer, IpcRendererEvent } from "electron/renderer";

declare global {
  interface ElectronAPI {
    setMessage(message: string): void;

    handleMessage(callback: (event: IpcRendererEvent, message: string) => void): void;
  }

  interface Window {
    electronApi: ElectronAPI;
    ipcRenderer: IpcRenderer;
  }
}
