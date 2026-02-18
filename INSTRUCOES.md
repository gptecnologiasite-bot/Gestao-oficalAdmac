# 📋 Instruções de Uso

## ⚡ Início Rápido

### 1. Instalar Dependências
```powershell
npm install
```

### 2. Iniciar o Servidor
```powershell
npm run dev
```

### 3. Acessar no Navegador
Abra: **http://localhost:5173**

### 4. Fazer Login
- Email: `admin@igreja.com`
- Senha: `admin123`

## 🔍 Verificação de Problemas

Se algo não funcionar, siga estes passos:

### Passo 1: Verificar Instalação
```powershell
# Verificar se node_modules existe
Test-Path node_modules

# Se não existir, instalar
npm install
```

### Passo 2: Verificar Erros no Terminal
Quando executar `npm run dev`, verifique se há mensagens de erro em vermelho.

### Passo 3: Verificar Console do Navegador
1. Abra o navegador em `http://localhost:5173`
2. Pressione **F12** para abrir DevTools
3. Vá na aba **Console**
4. Procure por erros em vermelho

### Passo 4: Verificar Erros Comuns

#### Erro: "Cannot find module"
**Solução**: 
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

#### Erro: "Port 5173 already in use"
**Solução**: 
```powershell
npm run dev -- --port 3000
```
Depois acesse: `http://localhost:3000`

#### Erro: Página em branco
**Solução**:
1. Verifique o console do navegador (F12)
2. Limpe o cache: `Ctrl + Shift + Delete`
3. Tente em modo anônimo

#### Erro: "Failed to resolve import"
**Solução**: Verifique se todas as dependências estão instaladas:
```powershell
npm install react react-dom react-router-dom recharts lucide-react date-fns
```

## 📝 Estrutura de Arquivos Esperada

Certifique-se de que estes arquivos existem:

```
Gestao-Admac/
├── node_modules/          ✅ Deve existir após npm install
├── package.json           ✅ Deve existir
├── vite.config.ts         ✅ Deve existir
├── index.html             ✅ Deve existir
├── src/
│   ├── main.tsx          ✅ Deve existir
│   ├── App.tsx           ✅ Deve existir
│   ├── index.css         ✅ Deve existir
│   ├── components/       ✅ Deve existir
│   ├── context/          ✅ Deve existir
│   ├── pages/            ✅ Deve existir
│   ├── services/         ✅ Deve existir
│   └── types/            ✅ Deve existir
```

## 🎯 Teste Rápido

Execute este comando para verificar se tudo está OK:

```powershell
# Verificar se o projeto compila
npm run build
```

Se compilar sem erros, o projeto está configurado corretamente.

## 💡 Dicas

1. **Sempre use o terminal PowerShell** (não CMD)
2. **Mantenha o terminal aberto** enquanto `npm run dev` está rodando
3. **Não feche a aba do navegador** enquanto desenvolve
4. **Use Chrome ou Edge** para melhor compatibilidade

## 🆘 Ainda Não Funciona?

Se após seguir todos os passos ainda não funcionar:

1. **Copie a mensagem de erro completa** do terminal
2. **Copie a mensagem de erro** do console do navegador (F12)
3. **Verifique a versão do Node.js**: `node --version` (deve ser >= 16)
4. **Verifique a versão do npm**: `npm --version` (deve ser >= 7)

Com essas informações, será mais fácil identificar o problema específico.

