#!/bin/bash

# É necessario tornar esse arquivo executavel com o comando chmod +x generate-keys.sh

# Gerar chave privada RSA 2048 bits
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Gerar chave pública a partir da chave privada
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Converter chave privada para Base64 e salvar no arquivo private_key_base64.pem
base64 private_key.pem -w 0 >private_key_base64.pem

# Converter chave pública para Base64 e salvar no arquivo public_key_base64.pem
base64 public_key.pem -w 0 >public_key_base64.pem

echo "Chaves geradas e convertidas para Base64 com sucesso!"
