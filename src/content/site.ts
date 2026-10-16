/**
 * Editable site copy & contact links for Julio Cesar / Juliusggr.
 * Update this file to change bio, email, and social URLs.
 */
export const site = {
  brand: "Juliusggr",
  name: "Julio Cesar",
  githubUser: "Juliusggr",
  email: "juliusggr@proton.me",
  mailto: "mailto:juliusggr@proton.me?subject=Hola%20Juliusggr",
  socials: {
    github: "https://github.com/Juliusggr",
    x: "https://x.com/Juliusggr",
  },
  headline:
    "Desarrollo web y aplicaciones de escritorio con foco en claridad y rendimiento.",
  tagline:
    "Construyo interfaces modernas y herramientas de escritorio que se sienten precisas, rápidas y fáciles de usar.",
  about: [
    "Soy Julio Cesar, conocido en la red como Juliusggr. Diseño y desarrollo experiencias web y aplicaciones de escritorio con una mirada minimalista: menos ruido, más precisión.",
    "Me interesa el detalle tipográfico, la densidad calmada de las interfaces y el código que se mantiene limpio con el tiempo. Trabajo en stacks modernos del frontend y en herramientas multiplataforma para escritorio.",
    "Cuando no estoy construyendo productos, exploro sistemas, tipografía y estética espacial — la misma calma técnica que busco en cada interfaz.",
  ],
  focus: [
    {
      label: "Web",
      detail: "Interfaces y sitios para el navegador.",
      stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      label: "Escritorio",
      detail: "Aplicaciones de escritorio, nativas y multiplataforma.",
      stack: ["Electron", ".NET / WPF", "C#", "SQLite"],
    },
    {
      label: "Detalle",
      detail: "Sistema visual, datos y rendimiento.",
      stack: ["UI/UX", "Prisma", "Rendimiento"],
    },
  ],
} as const;
