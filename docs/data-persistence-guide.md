# 🔧 Guia de Persistência de Dados - LeiriAgenda

## ✅ Problemas Resolvidos

### 1. **Ícone do Calendário Removido**
- ✅ Removido import do `Calendar` do header
- ✅ Removido ícone do menu "Meus Eventos"

### 2. **Sistema de Persistência Implementado**
- ✅ Criado `DataService` para gestão de dados
- ✅ Utilizadores são agora guardados no localStorage
- ✅ Eliminação de utilizadores funciona permanentemente
- ✅ Criação de contas com nomes personalizados

## 🗄️ Soluções de Persistência

### **Solução Atual: localStorage (Desenvolvimento)**
```typescript
// Armazena dados no browser do utilizador
localStorage.setItem('leiriagenda_users', JSON.stringify(users))
```

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Não requer configuração de servidor
- ✅ Dados persistem entre sessões

**Limitações:**
- ⚠️ Dados apenas no browser local
- ⚠️ Perdidos se limpar cache
- ⚠️ Não partilhados entre dispositivos

### **Soluções para Produção:**

#### **1. 🚀 Base de Dados Online (Recomendado)**

##### **Opção A: Supabase (Grátis + Fácil)**
```bash
npm install @supabase/supabase-js
```

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://seu-projeto.supabase.co'
const supabaseKey = 'sua-chave-publica'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Exemplo de uso
const { data: users } = await supabase
  .from('users')
  .select('*')
```

##### **Opção B: Firebase (Google)**
```bash
npm install firebase
```

##### **Opção C: PostgreSQL + Prisma**
```bash
npm install prisma @prisma/client
```

#### **2. 📊 APIs Externas**

##### **JSONBin (Simples)**
```typescript
const API_KEY = 'sua-chave'
const BIN_ID = 'seu-bin'

// Guardar dados
fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': API_KEY
  },
  body: JSON.stringify(dados)
})
```

#### **3. 🏠 Servidor Próprio**

##### **Next.js API Routes**
```typescript
// pages/api/users.ts
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Criar utilizador
    const user = await createUser(req.body)
    res.json(user)
  }
  
  if (req.method === 'DELETE') {
    // Eliminar utilizador
    await deleteUser(req.query.id)
    res.json({ success: true })
  }
}
```

## 🛠️ Como Implementar Persistência Real

### **Passo 1: Escolher Solução**
Para começar rapidamente, recomendo **Supabase**:

1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Obter URL e chave API

### **Passo 2: Configurar Base de Dados**
```sql
-- Tabela de utilizadores
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'User',
  status TEXT DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  last_active DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT,
  category TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Passo 3: Atualizar DataService**
```typescript
// lib/data-service.ts
import { supabase } from './supabase'

class DataService {
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    return !error
  }

  static async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    
    if (error) throw error
    return data[0]
  }
}
```

### **Passo 4: Atualizar Componentes**
```typescript
// Usar async/await nos componentes
const loadUsers = async () => {
  try {
    const users = await DataService.getUsers()
    setUsers(users)
  } catch (error) {
    console.error('Erro ao carregar utilizadores:', error)
  }
}
```

## 🔧 Configuração Rápida

### **Para começar hoje com Supabase:**

1. **Criar projeto:**
   - Ir a [supabase.com](https://supabase.com)
   - Criar conta gratuita
   - Criar novo projeto

2. **Obter credenciais:**
   - Copiar URL do projeto
   - Copiar chave "anon public"

3. **Instalar dependências:**
   ```bash
   npm install @supabase/supabase-js
   ```

4. **Configurar variáveis de ambiente:**
   ```env
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
   ```

5. **Criar tabelas no Supabase:**
   - Ir ao SQL Editor
   - Executar o SQL das tabelas acima

## 📋 Checklist de Implementação

- ✅ **Ícone calendário removido**
- ✅ **localStorage implementado (temporário)**
- ✅ **DataService criado**
- ✅ **Eliminação de utilizadores funcional**
- ⏳ **Configurar Supabase** (próximo passo)
- ⏳ **Migrar de localStorage para BD real**
- ⏳ **Implementar autenticação real**
- ⏳ **Adicionar validações**

## 🎯 Próximos Passos Recomendados

1. **Configurar Supabase** (15 min)
2. **Migrar sistema de utilizadores** (30 min)
3. **Implementar registo real** (20 min)
4. **Adicionar sistema de eventos** (45 min)

O sistema atual já funciona localmente. Para ter dados permanentes e partilhados, implemente uma das soluções de base de dados acima!
