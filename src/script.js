// Electron   -  Erasmo Cardoso
// Download videos

document.getElementById('downloadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const url = document.getElementById('urlInput').value;
    const name = document.getElementById('fileNameInput').value;
    const quality = document.getElementById('qualitySelect').value;

    console.log('Enviando dados para o backend:', { url, name, quality });
    window.electronAPI.send('start-download', { url, name, quality });

    alert('Download iniciado! agurde finalizar.');
});

// aguardando para receber mensagens do processo principal
window.electronAPI.on('download-progress', (message) => {
    console.log(message); 
});

window.electronAPI.on('download-complete', (message) => {
    console.log(message); 
    alert(message); 
});

window.electronAPI.on('download-error', (error) => {
    console.error('Erro:', error); 
    alert('Erro: ' + error); 
});

// Fechar a janela quando o botão de fechar for clicado
document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.send('close-window');
});