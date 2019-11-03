const { app, BrowserWindow, Menu } = require('electron');
const Settings = require('electron-store');
const windowState = require('electron-window-state');
const path = require('path');
const url = require('url');

let mainWindow;

const settings = new Settings();

app.on('ready', () => {
    let mainWindowState = windowState({
        defaultWidth: 400,
        defaultHeight: 600
    });

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 400,
        minHeight: 100,
        backgroundColor: (settings.get('dark')) ? '#292929' : '#FFFFFF',
        title: 'Calculator',
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('will-navigate', (event) => {
        event.preventDefault();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:'
    }));

    mainWindowState.manage(mainWindow);

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click() { app.quit(); } },
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "CmdOrCtrl+Shift+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }, {
            label: 'View',
            submenu: [
                {
                    label: 'Developer Tools',
                    accelerator: 'CmdOrCtrl+Option+I',
                    click() {
                        mainWindow.toggleDevTools();
                    }
                },
                {
                    label: 'Invert',
                    accelerator: 'CmdOrCtrl+I',
                    click() {
                        if (settings.get('dark')) {
                            settings.delete('dark');
                        } else {
                            settings.set('dark', 'true');
                        }
                        mainWindow.webContents.send('invert');
                    }
                },
                {
                    label: 'Refresh',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        mainWindow.webContents.send('refresh');
                    }
                }
            ]
        }
    ]));
});

app.on('window-all-closed', () => {
    app.quit();
});