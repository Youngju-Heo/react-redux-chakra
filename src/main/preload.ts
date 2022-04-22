import { ipcRenderer } from "electron";

(window as unknown as Record<string, unknown>).ipcRenderer = ipcRenderer;
