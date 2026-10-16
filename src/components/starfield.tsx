export function Starfield() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(147,197,253,0.16),transparent_60%)] dark:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#94a3b8_0,transparent_1.25px)] [background-size:16px_16px] dark:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_92%)] dark:hidden" />

      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(140,160,200,0.16),transparent_55%)] dark:block" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_80%_20%,rgba(100,120,160,0.1),transparent_40%)] dark:block" />
      <div className="starfield absolute inset-0 hidden dark:block" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
