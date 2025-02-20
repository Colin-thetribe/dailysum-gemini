#!/bin/bash

# Détecter l'OS
OS="$(uname -s)"
ARCH="$(uname -m)"

# Définir le nom du binaire en fonction de l'OS
case "$OS" in
    Linux*)     BINARY_NAME=flemmai-linux;;
    Darwin*)    BINARY_NAME=flemmai-macos;;
    MINGW*)     BINARY_NAME=flemmai-win.exe;;
    *)          echo "OS non supporté: $OS" && exit 1
esac

# Créer le dossier d'installation
INSTALL_DIR="$HOME/.flemmai"
mkdir -p "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR/templates"

# Copier les fichiers nécessaires
cp dist/$BINARY_NAME "$INSTALL_DIR/flemmai"
cp templates/* "$INSTALL_DIR/templates/"
cp .env.example "$INSTALL_DIR/.env"

# Rendre le binaire exécutable
chmod +x "$INSTALL_DIR/flemmai"

# Créer un lien symbolique
sudo ln -sf "$INSTALL_DIR/flemmai" /usr/local/bin/flemmai

echo "✅ FlemmAI a été installé avec succès!"
echo "📝 N'oubliez pas de configurer votre clé API dans $INSTALL_DIR/.env" 