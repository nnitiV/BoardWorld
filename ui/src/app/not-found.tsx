import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 font-sans">
      <h1 className="text-8xl font-extrabold tracking-tighter">404</h1>
      <h2 className="text-3xl mt-4 font-semibold">Route Not Found</h2>
      <p className="mt-4 text-slate-400 max-w-md text-center">
        We searched everywhere, but the page or game you are looking for doesn&apos;t seem to exist in our catalog.
      </p>
      
      <Link 
        href="/" 
        className="mt-8 px-6 py-3 bg-white text-slate-900 rounded-full font-bold shadow-lg hover:bg-slate-200 transition-all"
      >
        Return to Storefront
      </Link>
    </div>
  );
}