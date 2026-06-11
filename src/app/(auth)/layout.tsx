export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 notebook-paper">
      <div className="notebook-margin hidden md:block"></div>
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
