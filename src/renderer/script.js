// Electron   -  Erasmo Cardoso
// Download videos

document.getElementById('downloadForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const url = document.getElementById('urlInput').value;
  const name = document.getElementById('fileNameInput').value;
  const quality = document.getElementById('qualitySelect').value;

  console.log('Enviando dados para o backend:', { url, name, quality });
  window.electronAPI.send('start-download', { url, name, quality });

  const statusMessage = document.getElementById('statusMessage');
  if (statusMessage) {
      statusMessage.textContent = 'Download iniciado! Preparando...';
      statusMessage.style.color = '#61dafb'; // Cor de destaque para status inicial
  }
});

// Ouvinte de progresso do download
window.electronAPI.on('download-progress', ({ percent, speed }) => {
  const progress = document.getElementById('progress');
  const speedElement = document.getElementById('speed');
  const statusMessage = document.getElementById('statusMessage');
  
  if (progress) {
      progress.style.width = `${percent}%`;
      progress.textContent = `${percent}%`; // Exibe a porcentagem na barra
  }
  
  if (speedElement) {
      speedElement.textContent = `Velocidade: ${speed.toFixed(2)} MB/s`;
  }

  if (statusMessage) {
      statusMessage.textContent = `Baixando... ${percent}%`;
  }
});

// Ouvinte de conclusão do download
window.electronAPI.on('download-complete', ({ path, size }) => {
  const progress = document.getElementById('progress');
  const speedElement = document.getElementById('speed');
  const statusMessage = document.getElementById('statusMessage');

  if (progress) {
      progress.style.width = '100%';
      progress.textContent = '100%';
      progress.style.backgroundColor = '#28a745'; // Cor verde para sucesso
  }
  
  if (speedElement) {
      speedElement.textContent = '';
  }

  if (statusMessage) {
      statusMessage.textContent = `Download completo! Arquivo salvo em: ${path}`;
      statusMessage.style.color = '#28a745';
  }
  // alert(`Download completo!\nArquivo salvo em: ${path}\nTamanho: ${size}`); // Removido para evitar bloqueio
});

// Ouvinte de erro
window.electronAPI.on('download-error', (error) => {
  console.error('Erro:', error);
  const progress = document.getElementById('progress');
  const speedElement = document.getElementById('speed');
  const statusMessage = document.getElementById('statusMessage');

  if (progress) {
      progress.style.width = '0%';
      progress.textContent = '0%';
      progress.style.backgroundColor = '#dc3545'; // Cor vermelha para erro
  }
  if (speedElement) {
      speedElement.textContent = '';
  }
  if (statusMessage) {
      statusMessage.textContent = `Erro no download: ${error}`;
      statusMessage.style.color = '#dc3545';
  }
  alert('Erro: ' + error);
});
