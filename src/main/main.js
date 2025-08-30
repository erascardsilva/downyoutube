// Electron   -  Erasmo Cardoso
// Download videos

const { app, BrowserWindow, ipcMain, Menu, clipboard } = require("electron");
const path = require("path");
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const https = require("https");

// Verificar/Criar diretório /tmp com permissões corretas
try {
  fs.accessSync("/tmp", fs.constants.W_OK | fs.constants.X_OK);
} catch (err) {
  fs.mkdirSync("/tmp", { recursive: true });
  fs.chmodSync("/tmp", 0o1777);
}

// Configurações de linha de comando
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("--disable-software-rasterizer");
app.commandLine.appendSwitch("--disable-dev-shm-usage");

// Gerenciamento de Janela
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
      enableRemoteModule: false,
    },
    frame: true,
    icon: path.join(__dirname, "..", "renderer", "assets", "icon.png"),
    backgroundColor: "#2e2c29",
  });

  // Implementar menu de contexto personalizado para colar
  mainWindow.webContents.on('context-menu', (event, params) => {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Colar',
        enabled: params.isEditable && clipboard.readText().length > 0,
        click: () => {
          mainWindow.webContents.paste();
        }
      }
    ]);
    menu.popup(mainWindow);
  });

  // Carregar interface
  mainWindow
    .loadFile(path.join(__dirname, "..", "renderer", "index.html"))
    .catch((err) => {
      console.error("Erro ao carregar index.html:", err);
      app.quit();
    });

  Menu.setApplicationMenu(null);

  // Otimizações
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  return mainWindow;
}

// Ciclo de Vida do Aplicativo
app.whenReady().then(() => {
  const mainWindow = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC Handlers (Comunicação com o Renderer)
ipcMain.on("start-download", async (event, { url, name, quality }) => {
  try {
    if (!ytdl.validateURL(url)) {
      return event.reply("download-error", "URL inválida");
    }

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        client: new https.Agent({ rejectUnauthorized: false }),
      },
    });

    const availability = info.player_response?.playabilityStatus;
    if (!availability || availability.status !== "OK") {
      return event.reply(
        "download-error",
        availability?.reason || "Vídeo indisponível"
      );
    }

    let chosenFormat;
    const availableFormats = info.formats.filter(f => f.hasVideo && f.hasAudio && (f.container === 'mp4' || f.container === 'webm'));

    if (quality === "highest") {
      chosenFormat = ytdl.chooseFormat(availableFormats, { quality: 'highest' });
    } else if (quality === "lowest") {
      chosenFormat = ytdl.chooseFormat(availableFormats, { quality: 'lowest' });
    } else {
      // Para qualidades específicas (ITAGs), tentar encontrar o formato exato
      chosenFormat = availableFormats.find(f => f.itag === parseInt(quality));
    }

    if (!chosenFormat) {
      return event.reply("download-error", `Formato de vídeo não suportado ou indisponível para a qualidade selecionada: ${quality}. Tente 'Melhor qualidade'.`);
    }

    const safeName = name.replace(/[<>:"/\\|?*]/g, "").substring(0, 128);
    const output = path.join(
      app.getPath("downloads"),
      `${safeName}.${chosenFormat.container}`
    );

    const download = ytdl(url, {
      format: chosenFormat,
      highWaterMark: 1024 * 1024 * 32,
    });

    // Progresso do download
    let startTime = Date.now();
    let downloadedBytes = 0;
    const totalSize = parseInt(chosenFormat.contentLength, 10); // Obter o tamanho total do arquivo

    download.on("progress", (chunkLength, downloaded) => {
      downloadedBytes += chunkLength;
      const elapsed = (Date.now() - startTime) / 1000; // Tempo em segundos
      const speed = (downloadedBytes / 1024 / 1024 / elapsed); // MB/s
      const percent = (totalSize > 0) ? ((downloadedBytes / totalSize) * 100) : 0;

      event.reply("download-progress", {
        percent: parseFloat(percent.toFixed(2)),
        speed: parseFloat(speed.toFixed(2)),
      });
    });

    download.pipe(fs.createWriteStream(output));

    download.on("end", () => {
      event.reply("download-complete", {
        path: output,
        size: fs.statSync(output).size,
      });
    });

    download.on("error", (err) => {
      event.reply("download-error", err.message);
    });
  } catch (err) {
    event.reply("download-error", err.message);
  }
});

ipcMain.on("close-window", () => {
  app.quit();
});
