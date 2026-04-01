# Adapta Elite Onboarding — Instruções para Claude

## Arquitetura de emails (IMPORTANTE)

**Nunca use o sistema de email padrão do Supabase** (SMTP built-in, `/auth/v1/signup` com confirmação, `/auth/v1/recover`).

O Supabase free tier tem rate limit severo (2 emails/hora) que bloqueia os fluxos de auth em testes e produção.

### Como emails devem ser enviados

Todo fluxo que envolva envio de email deve usar **Edge Functions + API do Resend** diretamente.

#### Fluxos já implementados

| Fluxo | Edge Function | Como funciona |
|-------|--------------|---------------|
| Signup | `signup` | Admin API cria usuário com `email_confirm: true`, sem email de confirmação |
| Reset de senha | `reset-password-email` | Admin API gera recovery link, Resend envia o email |

#### Padrão para novos fluxos

1. Criar Edge Function em Supabase (deploy via MCP ou CLI)
2. Usar `SUPABASE_SERVICE_ROLE_KEY` (injetado automaticamente) para Admin API
3. Enviar email via `https://api.resend.com/emails` com `RESEND_API_KEY` (secret já configurado)
4. Sender: `Adapta Elite <onboarding@resend.dev>`
5. Atualizar o frontend (`useAuthStore.ts`) para chamar `/functions/v1/nome-da-function` em vez dos endpoints de auth do Supabase

#### Fluxos ainda não implementados (seguir o mesmo padrão se implementar)
- Troca de email (`email_change`) — usar `supabase.auth.admin.generateLink({ type: 'email_change_new', ... })`
- Magic link — usar `supabase.auth.admin.generateLink({ type: 'magiclink', ... })`
- Convite de usuário — usar `supabase.auth.admin.generateLink({ type: 'invite', ... })`

## Projeto Supabase

- Project ID: `ajuqkffzkxjtwmfafwvu`
- Nome: Internal Projects
- Region: us-west-2

## Stack

- Frontend: React + TypeScript + Vite
- Auth: Supabase (chamadas diretas via fetch, sem SDK do cliente)
- Emails: Resend via Edge Functions
- DB: Supabase Postgres
- Domínio de acesso: apenas `@adapta.org`
