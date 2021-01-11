const { app, BrowserWindow } = require("electron");
const path = require("path");
const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');

async function showWindow() {
    try {
      await authService.refreshTokens();
      return createAppWindow();
    } catch (err) {
      createAuthWindow();
    }
}

// Function to create page for application home screen
const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "home.js"))
}

// Invoke when application loaded
app.on("ready", showWindow);

// Quit process if windows closed and not running on MacOS
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Invoke application when icon is clicked if no windows are open
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});
/*
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

// Invoke application when icon is clicked if no windows are open
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
}); */