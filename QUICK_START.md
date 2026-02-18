# 🚀 Guia Rápido de Inicialização

## Passo a Passo

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Acessar no Navegador
Abra: `http://localhost:5173`

### 4. Fazer Login
Use uma das credenciais:
- **Admin**: `admin@igreja.com` / `admin123`
- **Líder**: `lider@igreja.com` / `lider123`
- **Visualizador**: `viewer@igreja.com` / `viewer123`

## ⚠️ Se Não Funcionar

### Erro: "Cannot find module"
```bash
# Limpar e reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Usar outra porta
npm run dev -- --port 3000
```

### Erro: Página em branco
1. Abra o DevTools (F12)
2. Verifique a aba Console para erros
3. Verifique a aba Network para requisições falhando

### Erro no navegador sobre módulos
- Certifique-se de estar acessando `http://localhost:5173` (não file://)
- Limpe o cache do navegador (Ctrl+Shift+Delete)

## 📋 Checklist de Verificação

- [ ] Node.js instalado (versão >= 16)
- [ ] npm instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor rodando (`npm run dev`)
- [ ] Navegador acessando `http://localhost:5173`
- [ ] Console do navegador sem erros críticos

## 🐛 Problemas Comuns

### 1. "npm: command not found"
**Solução**: Instale Node.js de https://nodejs.org/

### 2. "EACCES: permission denied"
**Solução Windows**: Execute o PowerShell como Administrador

### 3. "Cannot find module 'react'"
**Solução**: Execute `npm install` novamente

### 4. Página carrega mas está em branco
**Solução**: 
- Verifique o console do navegador (F12)
- Verifique se há erros de JavaScript
- Tente limpar o localStorage: `localStorage.clear()` no console

### 5. Login não funciona
**Solução**: 
- Use exatamente as credenciais: `admin@igreja.com` / `admin123`
- Verifique se não há espaços extras
- Limpe o localStorage e tente novamente

## 📞 Precisa de Ajuda?

Se o problema persistir:
1. Verifique o arquivo `TROUBLESHOOTING.md` para mais detalhes
2. Verifique o console do navegador (F12) para mensagens de erro
3. Verifique o terminal onde `npm run dev` está rodando para erros

