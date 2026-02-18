# Guia de Solução de Problemas

## Problemas Comuns e Soluções

### 1. Erro ao executar `npm install`

**Problema**: Dependências não instalam corretamente

**Solução**:
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules e package-lock.json se existir
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstalar dependências
npm install
```

### 2. Erro ao executar `npm run dev`

**Problema**: Servidor não inicia

**Soluções**:

a) Verificar se a porta 5173 está disponível:
```bash
# No PowerShell, verificar porta
netstat -ano | findstr :5173
```

b) Especificar outra porta:
```bash
npm run dev -- --port 3000
```

c) Verificar erros de TypeScript:
```bash
npx tsc --noEmit
```

### 3. Erro de importação do date-fns/locale

**Problema**: `Cannot find module 'date-fns/locale'`

**Solução**: O locale está correto. Se ainda der erro, reinstale:
```bash
npm uninstall date-fns
npm install date-fns@^2.30.0
```

### 4. Página em branco no navegador

**Problemas possíveis**:

a) **Erro no console do navegador**: Abra o DevTools (F12) e verifique erros

b) **localStorage bloqueado**: Verifique se o navegador permite localStorage

c) **Rotas não funcionando**: Verifique se está acessando `http://localhost:5173` (não `/index.html`)

### 5. Erro de módulo não encontrado

**Problema**: `Cannot find module '...'`

**Solução**:
```bash
# Reinstalar todas as dependências
npm install

# Se persistir, verificar versões do Node.js
node --version  # Deve ser >= 16
npm --version   # Deve ser >= 7
```

### 6. Erro de TypeScript

**Problema**: Erros de tipo no TypeScript

**Solução**:
```bash
# Verificar erros
npx tsc --noEmit

# Se houver muitos erros, pode ser necessário ajustar tsconfig.json
```

### 7. Tailwind CSS não está funcionando

**Problema**: Estilos não aparecem

**Solução**:
```bash
# Verificar se postcss.config.js existe
# Verificar se tailwind.config.js existe
# Verificar se index.css importa Tailwind corretamente
```

### 8. Gráficos não aparecem

**Problema**: Recharts não renderiza

**Solução**: Verifique se há dados. O gráfico só aparece se houver transações cadastradas.

### 9. Login não funciona

**Problema**: Credenciais não são aceitas

**Solução**: Use as credenciais padrão:
- Admin: `admin@igreja.com` / `admin123`
- Líder: `lider@igreja.com` / `lider123`
- Visualizador: `viewer@igreja.com` / `viewer123`

### 10. Dados não persistem

**Problema**: Dados são perdidos ao recarregar

**Solução**: Verifique se o navegador permite localStorage. Tente em modo anônimo para testar.

## Passos de Verificação Rápida

1. ✅ Verificar se Node.js está instalado: `node --version`
2. ✅ Verificar se npm está instalado: `npm --version`
3. ✅ Instalar dependências: `npm install`
4. ✅ Verificar se não há erros: `npm run build`
5. ✅ Iniciar servidor: `npm run dev`
6. ✅ Abrir navegador em `http://localhost:5173`
7. ✅ Verificar console do navegador (F12) para erros

## Comandos Úteis

```bash
# Limpar tudo e reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Verificar erros de TypeScript
npx tsc --noEmit

# Verificar erros de ESLint
npm run lint

# Build de produção para testar
npm run build
npm run preview
```

## Se Nada Funcionar

1. Verifique a versão do Node.js (deve ser >= 16)
2. Tente em outro navegador
3. Limpe o cache do navegador
4. Verifique se há firewall bloqueando a porta
5. Tente executar em modo administrador (Windows)

