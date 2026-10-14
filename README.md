# Juliusggr — landing personal

Landing page de **Julio Cesar** (`Juliusggr`): desarrollador de aplicaciones web y de escritorio.

Repositorio canónico: [github.com/Juliusggr/Juliusggr-landing](https://github.com/Juliusggr/Juliusggr-landing).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Tema claro/oscuro (sistema por defecto; preferencia en `localStorage` tras el toggle)

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:43123](http://127.0.0.1:43123).

Otros comandos:

```bash
npm run build
npm run start   # producción en el puerto 43123
npm run lint
```

## Contenido editable

Copia, email y redes viven en un solo archivo:

[`src/content/site.ts`](src/content/site.ts)

- Email: `juliusggr@proton.me`
- GitHub: [github.com/Juliusggr](https://github.com/Juliusggr) (API pública sin auth)
- X: [x.com/Juliusggr](https://x.com/Juliusggr)

La bio en «Sobre mí» también se edita ahí.

## Proyectos (GitHub)

La sección Proyectos consulta `https://api.github.com/users/Juliusggr/repos` (revalidación ~30 min). Omite forks y repos archivados. Sin token; si GitHub limita la tasa, se muestra un mensaje claro.
