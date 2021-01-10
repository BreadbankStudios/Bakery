const { app, BrowserWindow } = require("electron");
const path = require(path);

// Function to create page for application home screen
const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

// Invoke when application loaded
app.on("ready", loadMainWindow);

// Quit process if windows closed and not running on MacOS
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});