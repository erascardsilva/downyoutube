# DownYouTube

DownYouTube é um aplicativo desktop desenvolvido em Electron que permite baixar vídeos do YouTube de forma rápida e fácil. Com uma interface simples e intuitiva, você pode escolher a qualidade do vídeo e salvá-lo diretamente no seu computador.

<img width = "1000px" src="https://github.com/user-attachments/assets/defeb61b-562c-4624-af3e-108227d73d7c>


---

## Funcionalidades

- **Baixar vídeos do YouTube**: Insira a URL do vídeo e escolha a qualidade desejada.
- **Escolha a qualidade**: Selecione entre várias opções de qualidade, como 144p, 360p, 720p, 1080p e mais.
- **Nomeie o arquivo**: Defina um nome personalizado para o arquivo de vídeo baixado.
- **Multiplataforma**: Disponível para Windows , Linux e Mac.

---

## Como Usar

1. **Insira a URL do vídeo**: Cole o link do vídeo do YouTube no campo "URL do Vídeo".
2. **Defina o nome do arquivo**: Escolha um nome para o arquivo de vídeo.
3. **Selecione a qualidade**: Escolha a qualidade desejada no menu suspenso.
4. **Clique em "Baixar"**: O vídeo será baixado e salvo no seu computador.

---

## Instalação

### Windows

1. Vá para a pasta `dist` no  projeto.
2. Execute o instalador `DownYouTube Setup X.X.X.exe` (substitua `X.X.X` pela versão do seu aplicativo).
3. Siga as instruções do instalador para concluir a instalação.

### Linux (Debian/Ubuntu)

1. Vá para a pasta `dist` no  projeto.
2. Instale o pacote `.deb` usando o comando:
   ```bash
   sudo dpkg -i downyoutube_X.X.X_amd64.deb
   ```
3.Se houver dependências faltando, execute:
    ```bash
    sudo apt-get install -f
    ```
### Linux (AppImage (Linux))  

1. Vá para a pasta dist no projeto.

2. Torne o arquivo DownYouTube-X.X.X.AppImage executável:
    ```bash
    chmod +x DownYouTube-X.X.X.AppImage
    ```

3. Execute o aplicativo:
    ```bash
    ./DownYouTube-X.X.X.AppImage
    ```
### Pasta dist
    ```bash
        dist/
    ├── downyoutube_X.X.X_amd64.deb       # Pacote .deb para Linux
    ├── DownYouTube-X.X.X.AppImage        # AppImage para Linux
    ├── DownYouTube Setup X.X.X.exe       # Instalador para Windows
    └── DownYouTube-X.X.X-portable.exe    # Versão portátil para Windows
    ``` 

### Como Compilar o Projeto

Se você deseja compilar o projeto por conta própria, siga os passos abaixo:

1. Clone o repositorio

    ```bash
    git clone https://github.com/seu-usuario/downyoutube.git
    cd downyoutube
    ```
2. Instale as dependencias

    ```bash
    npm install
    ```
3. Compile o projeto

    Windows
    ```bash
    npm run build:win
    ```
    Linux
    ```bash
    npm run build:linux
    ```
    Mac
    ```bash
    npm run build:mac
    ```
4. Encontre os arquivos instaláveis na pasta dist.

### Contribuição
Contribuições são bem-vindas! Se você quiser melhorar o projeto, siga os passos abaixo:

Faça um fork do repositório.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Faça commit das suas alterações (git commit -m 'Adiciona nova feature').

Envie para a branch (git push origin feature/nova-feature).

Abra um pull request.

### Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

### Contato
Se você tiver alguma dúvida ou sugestão, entre em contato:

Erasmo Cardoso
Email: erascardsilva@gmail.com
GitHub: ErasmoCardoso
WhatsApp : +55 11 949224355
