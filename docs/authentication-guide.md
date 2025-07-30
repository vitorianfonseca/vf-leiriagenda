# Sistema de Autenticação LeiriAgenda

## Funcionalidades Implementadas

### ✅ Sistema de Utilizadores
- **Registo com email** - Criar conta com nome, email e palavra-passe
- **Login com email** - Autenticação tradicional
- **Login com Google** - OAuth simulado (pronto para implementação real)
- **Gestão de perfil** - Atualizar informações pessoais
- **Favoritos** - Sistema de eventos favoritos por utilizador

### ✅ Painel de Administração
- **Dashboard administrativo** - `/admin`
- **Gestão de utilizadores** - `/admin/users`
- **Estatísticas** - Contadores e análises
- **Controlo de acesso** - Diferentes níveis de permissão

### ✅ Funcionalidades de Segurança
- **Armazenamento local** - Simulação de base de dados para desenvolvimento
- **Estados de utilizador** - Ativo, Inativo, Banido
- **Níveis de acesso** - User, Moderador, Admin

## Como Configurar Google OAuth Real

### 1. Google Cloud Console
```bash
# 1. Ir para https://console.cloud.google.com/
# 2. Criar um novo projeto ou selecionar existente
# 3. Ativar Google+ API e Google OAuth2 API
# 4. Criar credenciais OAuth 2.0
```

### 2. Variáveis de Ambiente
```bash
# Criar ficheiro .env.local
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Implementação com NextAuth.js
```bash
# Instalar dependências
npm install next-auth @auth/prisma-adapter

# Configurar app/api/auth/[...nextauth]/route.ts
```

### 4. Configuração NextAuth
```typescript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account }) {
      return token
    }
  }
})
```

## Base de Dados

### Opções Recomendadas
1. **PostgreSQL** - Para produção robusta
2. **SQLite** - Para desenvolvimento local
3. **MongoDB** - Para flexibilidade NoSQL
4. **Supabase** - Para backend completo

### Schema Utilizador Sugerido
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar TEXT,
  provider VARCHAR(50) DEFAULT 'email',
  role VARCHAR(20) DEFAULT 'user',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_favorites (
  user_id UUID REFERENCES users(id),
  event_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);
```

## URLs do Sistema

### 🔐 Como Aceder ao Painel de Admin

#### Opção 1: Login com Conta de Admin Predefinida
```
Email: admin@leiria.pt
Password: qualquer palavra-passe
```
OU
```
Email: admin@leiriagenda.com 
Password: qualquer palavra-passe
```

#### Opção 2: URL Direto (após login como admin)
- `/admin` - Dashboard principal

### Páginas Públicas
- `/` - Página inicial
- `/login` - Página de login
- `/registo` - Página de registo
- `/eventos` - Lista de eventos

### Páginas de Utilizador
- `/perfil` - Perfil do utilizador
- `/favoritos` - Eventos favoritos
- `/meus-eventos` - Eventos submetidos

### Páginas de Administração
- `/admin` - Dashboard principal
- `/admin/users` - Gestão de utilizadores
- `/admin/events` - Gestão de eventos
- `/admin/settings` - Configurações

## Estado Atual

O sistema está configurado com:
- ✅ Autenticação funcional (simulada)
- ✅ Google OAuth pronto para configuração
- ✅ Gestão de utilizadores
- ✅ Interface administrativa
- ✅ Sistema de favoritos
- ✅ Controlo de acesso

Para produção, é necessário:
- 🔧 Configurar base de dados real
- 🔧 Implementar Google OAuth real
- 🔧 Adicionar validação de emails
- 🔧 Implementar recuperação de palavra-passe
- 🔧 Adicionar logs de segurança
