# Publicar este site no GitHub Pages

Passos rápidos (substitua `<username>` e `<repo>` pelo seu):

1. Inicializar repositório local (se ainda não existe):

```powershell
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Ou, usando o GitHub CLI para criar e enviar em um único passo:

```powershell
gh repo create <username>/<repo> --public --source=. --remote=origin --push
```

2. Após o push, o workflow do GitHub Actions (`.github/workflows/deploy-pages.yml`) fará o deploy automático para o GitHub Pages. Aguarde alguns minutos e verifique em Settings → Pages.

3. Se quiser usar um domínio próprio, adicione o arquivo `CNAME` na raiz com seu domínio e configure DNS conforme o guia do GitHub.

Se quiser, eu posso:
- Gerar um arquivo `CNAME` vazio; ou
- Ajudar a criar o repositório remoto via `gh` (preciso que autorize/execute localmente).
