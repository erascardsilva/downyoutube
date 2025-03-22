// Electron   -  Erasmo Cardoso
// Download videos

document.getElementById('downloadForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const url = document.getElementById('urlInput').value;
  const name = document.getElementById('fileNameInput').value;
  const quality = document.getElementById('qualitySelect').value;

  console.log('Enviando dados para o backend:', { url, name, quality });
  window.electronAPI.send('start-download', { url, name, quality });

  alert('Download iniciado! Aguarde a finalização.');
});

// Ouvinte de progresso do download
window.electronAPI.on('download-progress', ({ percent, speed }) => {
  const progress = document.getElementById('progress');
  const speedElement = document.getElementById('speed');
  
  if (progress) {
      progress.style.width = `${percent}%`;
  }
  
  if (speedElement) {
      speedElement.textContent = `${speed.toFixed(2)} MB/s`; // Limita a 2 casas decimais
  }
});

// Ouvinte de conclusão do download
window.electronAPI.on('download-complete', ({ path, size }) => {
  alert(`Download completo!\nArquivo salvo em: ${path}\nTamanho: ${size}`);
  
  // Resetar a barra de progresso
  const progress = document.getElementById('progress');
  if (progress) {
      progress.style.width = '0%';
  }
  
  document.getElementById('speed').textContent = '';
});

// Ouvinte de erro
window.electronAPI.on('download-error', (error) => {
  console.error('Erro:', error);
  alert('Erro: ' + error);
  
  // Resetar elementos de progresso
  const progress = document.getElementById('progress');
  if (progress) {
      progress.style.width = '0%';
  }
  document.getElementById('speed').textContent = '';
});

// Fechar janela
document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.send('close-window');
});