"use client";
export default function ShellTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell-page-in" style={{ display: "contents" }}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .shell-page-in > * {
            animation: shell-page-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes shell-page-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>
      {children}
    </div>
  );
}
