export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container mx-auto bg-blue-100/25">{children}</main>
    </>
  );
}