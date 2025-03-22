// Electron   -  Erasmo Cardoso
// Download videos

const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    frame: false,
    icon: path.join(__dirname, "icon.png"),
  });

  // Remove o menu padrão
  Menu.setApplicationMenu(null);

  // Carrega o index.html da pasta src
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Verifica se o yt-dlp está instalado
  checkYtDlpInstallation(mainWindow);
}

// verificar se o yt-dlp está instalado
function checkYtDlpInstallation(mainWindow) {
  exec("yt-dlp --version", (error, stdout, stderr) => {
    if (error) {
      dialog.showMessageBox(mainWindow, {
        type: "error",
        title: "Erro",
        message: "O yt-dlp não está instalado no sistema.",
        detail:
          "Por favor, reinstale o aplicativo ou instale o yt-dlp manualmente.",
        buttons: ["OK"],
      });
    } else {
      console.log("yt-dlp está instalado:", stdout.trim());
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Função para baixar o vídeo
ipcMain.on("start-download", (event, { url, name, quality }) => {
  console.log("Recebido no backend:", { url, name, quality });
  const command = `yt-dlp -o "${name}.%(ext)s" -f "${quality}" ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Erro ao baixar vídeo:", stderr);
      event.reply("download-error", "Erro ao baixar vídeo: " + stderr);
      return;
    }
    console.log("Vídeo baixado:", stdout);
    event.reply("download-complete", "Download acabou...!");
  });
});

// Fechar a janela quando o evento 'close-window' for recebido
ipcMain.on("close-window", () => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) {
    mainWindow.close();
  }
});
