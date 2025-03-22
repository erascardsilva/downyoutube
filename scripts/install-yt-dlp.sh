#!/bin/bash

# Verifica se o yt-dlp já está instalado
if ! command -v yt-dlp &> /dev/null; then
    echo "Instalando yt-dlp..."
    # Baixa o yt-dlp
    sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
    # Torna o yt-dlp executável
    sudo chmod a+rx /usr/local/bin/yt-dlp
    echo "yt-dlp instalado com sucesso!"
else
    echo "yt-dlp já está instalado."
fi