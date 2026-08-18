import Link from "next/link";

export default function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Hero Section: Centered, max-width constrained for readable text lengths */}
      <section className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-950 tracking-tight mb-6">
          Welcome to Board World
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
          We believe the best experiences come from diving into great games. Whether you are gathering around a table to deal out a fresh deck of cards, setting up a massive strategy board, or just logging on to play with friends, our mission is to deliver the absolute best titles directly to your collection.
        </p>
      </section>

      {/* Values Grid: 1 column on mobile, 3 columns on tablet/desktop */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
        
        {/* Value Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Curated Selection</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From heavy strategy to quick party games, we hand-pick titles we actually love to play and share.
          </p>
        </div>

        {/* Value Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Secure & Fast</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Modern transactions and swift delivery ensure a seamless shopping experience from your cart to your tabletop.
          </p>
        </div>

        {/* Value Card 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Community First</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We aren&apos;t just a storefront; we are players. We are here to help you find your next game night obsession.
          </p>
        </div>

      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-950 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden">
        {/* Optional: Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to play?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Dive into our catalog and find the perfect addition to your game night.
          </p>
          <Link 
            href="/allProducts" 
            className="inline-block px-8 py-4 bg-white text-blue-950 font-bold rounded-xl hover:bg-slate-100 hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore All Products
          </Link>
        </div>
      </section>

    </div>
  );
}