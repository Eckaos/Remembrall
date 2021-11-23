import { app, BrowserWindow } from "electron";
const path = require("path");
export let mainWindow: BrowserWindow

app.on("ready", createWindows);

function createWindows(): void {
    mainWindow = new BrowserWindow({
        show: false,
        minWidth: 1280,
        minHeight: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile("./index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show());
    mainWindow.title = "Remembrall";
    mainWindow.setIcon("./remembrall-icon.png");

}



