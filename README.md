# Sistema de Gestão Financeira de Igreja

Sistema web completo para gestão financeira de igrejas, desenvolvido com React + Vite + TypeScript.

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login com usuário e senha
- Três níveis de acesso:
  - **Administrador**: Controle total do sistema
  - **Líder de Equipe**: Gerencia apenas sua equipe
  - **Visualizador**: Apenas leitura

### 📊 Dashboard
- Total geral de receitas
- Total geral de despesas
- Saldo atual
- Gráficos financeiros mensais (linha e barras)
- Cards de resumo visual

### 💰 Módulo Financeiro
- Cadastro de receitas e despesas
- Categorias personalizáveis (água, luz, eventos, manutenção, etc.)
- Filtros por:
  - Tipo (receita/despesa)
  - Equipe/Departamento
  - Período (data inicial e final)
- Exportação de relatórios em CSV
- Histórico completo de transações

### 👥 Gestão de Equipes
- Criar e gerenciar equipes/departamentos
- Definir líder de equipe
- Visualizar resumo financeiro por equipe
- Histórico de transações por equipe

### ⚙️ Painel do Administrador
- Criar e gerenciar usuários
- Ativar/desativar usuários
- Resetar senhas
- Definir funções e permissões
- Vincular usuários a equipes

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas
- **localStorage** - Armazenamento local (simulando backend)

## 📦 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd Gestao-Admac
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o sistema no navegador:
```
http://localhost:5173
```

## 🔑 Credenciais de Teste

O sistema vem com três usuários pré-configurados:

### Administrador
- **Email**: admin@igreja.com
- **Senha**: admin123
- **Permissões**: Acesso total ao sistema

### Líder de Equipe
- **Email**: lider@igreja.com
- **Senha**: lider123
- **Permissões**: Gerencia apenas sua equipe

### Visualizador
- **Email**: viewer@igreja.com
- **Senha**: viewer123
- **Permissões**: Apenas visualização

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal com sidebar
│   ├── PrivateRoute.tsx # Proteção de rotas
│   ├── Toast.tsx        # Notificações
│   ├── TransactionModal.tsx # Modal de transações
│   ├── TeamModal.tsx    # Modal de equipes
│   └── UserModal.tsx    # Modal de usuários
├── context/            # Context API
│   ├── AuthContext.tsx  # Autenticação
│   ├── FinanceContext.tsx # Dados financeiros
│   ├── ThemeContext.tsx # Tema claro/escuro
│   └── ToastContext.tsx # Notificações
├── pages/              # Páginas principais
│   ├── Login.tsx       # Página de login
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Finance.tsx     # Módulo financeiro
│   ├── Teams.tsx       # Gestão de equipes
│   └── Admin.tsx       # Painel administrativo
├── services/           # Serviços
│   └── storage.ts      # Gerenciamento do localStorage
├── types/              # Tipos TypeScript
│   └── index.ts        # Definições de tipos
├── App.tsx             # Componente raiz
├── main.tsx            # Entry point
└── index.css           # Estilos globais
```

## 🎨 Recursos de Interface

- ✅ Design moderno e responsivo
- ✅ Tema claro/escuro
- ✅ Menu lateral fixo
- ✅ Animações suaves
- ✅ Feedback visual (toasts)
- ✅ Loading states
- ✅ Validação de formulários
- ✅ Proteção de rotas privadas

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 💾 Armazenamento

O sistema utiliza `localStorage` para persistir dados. Todos os dados são salvos localmente no navegador, incluindo:
- Usuários
- Transações financeiras
- Equipes
- Sessão do usuário atual
- Preferência de tema

**Nota**: Os dados são locais ao navegador. Para produção, recomenda-se integrar com um backend real.

## 🔒 Segurança

- Senhas são armazenadas em texto plano no localStorage (apenas para demonstração)
- Em produção, implemente autenticação adequada com hash de senhas
- Use HTTPS em produção
- Implemente validação no backend

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ para gestão financeira de igrejas

