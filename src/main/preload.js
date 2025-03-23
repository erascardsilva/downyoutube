// Electron   -  Erasmo Cardoso
// Download videos

const { contextBridge, ipcRenderer } = require("electron");

// Lista de canais permitidos
const validSendChannels = ["start-download"];
const validReceiveChannels = [
  "download-progress",
  "download-complete",
  "download-error",
];

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, listener) => {
    if (validReceiveChannels.includes(channel)) {
      const subscription = (event, ...args) => listener(...args);
      ipcRenderer.on(channel, subscription);

      // Remover listener quando não for mais necessário
      return () => ipcRenderer.removeListener(channel, subscription);
    }
  },
});
