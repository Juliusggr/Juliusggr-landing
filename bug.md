# Bugs pendientes

Hallazgos de Bugbot (15 oct 2026). **Corregidos 16 oct 2026** en `src/components/hero.tsx`.

## 1. Retrato del hero pide un tamaño demasiado grande — corregido

- `sizes` alineado con `w-36` / `sm:w-52` / `lg:w-72` (144px, 208px, 288px).
- Se mantiene `preload` (retrato visible y candidato a LCP).

## 2. Los enlaces del hero se anuncian como botones — corregido

- CTAs son `<a>` con `buttonVariants` en lugar de `Button` + `nativeButton={false}`.

---

**Nota:** `src/components/contact.tsx` sigue usando el patrón `Button` + `render={<a />}` en el enlace mailto; mismo riesgo de accesibilidad si quieres unificarlo.
