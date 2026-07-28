import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Sparkles, Flower2 } from 'lucide-react';
import heroImg from '../../assets/image2.jpg';
import workshopImg from '../../assets/image1.jpg';

export const AuthLayout = ({
  children,
  imagePosition = 'left', // 'left' for Login (45/55), 'right' for Register (55/45)
  imageSrc,
  imageAlt = "Handcrafted embroidery art",
  imageBadgeText = "Artisan Embroidery",
  imageOverlayTitle = "ARTFUL STITCHES",
  imageOverlaySubtitle = '"Where Every Stitch Tells a Story"',
}) => {
  const isImageLeft = imagePosition === 'left';
  const defaultImg = isImageLeft ? heroImg : workshopImg;
  const finalImage = imageSrc || defaultImg || "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000";

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between relative overflow-hidden text-earth font-sans selection:bg-sage/20 selection:text-earth">
      {/* Subtle organic ambient background glows */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full bg-beige/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 rounded-full bg-olive/15 blur-3xl pointer-events-none" />
      
      {/* Thin thread decorative lines */}
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-earth-muted hover:text-sage-dark transition-colors duration-300 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Boutique</span>
        </Link>

        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-sage/15 border border-sage/40 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all duration-300">
            <Scissors className="w-4 h-4 rotate-45" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-earth group-hover:text-sage-dark transition-colors">
            Artful Stitches
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl border border-beige/80 shadow-warm-lg overflow-hidden transition-all duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-10 items-stretch min-h-[580px]">
            
            {/* IMAGE PANEL (45% on desktop = 4 cols out of 10) */}
            <div
              className={`lg:col-span-4 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden min-h-[260px] lg:min-h-full ${
                isImageLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {/* Background Image with Warm Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={finalImage}
                  alt={imageAlt}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000";
                  }}
                />
                {/* Editorial Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/40 to-earth/20 opacity-90" />
                <div className="absolute inset-0 bg-terracotta/10 mix-blend-overlay" />
              </div>

              {/* Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-terracotta-light animate-pulse" />
                  {imageBadgeText}
                </span>
              </div>

              {/* Bottom Editorial Overlay Text */}
              <div className="relative z-10 text-white space-y-3 pt-12 lg:pt-0">
                {/* Thin vertical thread divider line */}
                <div className="w-0.5 h-8 bg-terracotta/80 rounded-full mb-2" />
                
                <div className="flex items-center gap-2">
                  <Flower2 className="w-4 h-4 text-terracotta-light" />
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-beige">
                    {imageOverlayTitle}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight text-cream">
                  {imageOverlaySubtitle}
                </h3>
              </div>

              {/* Decorative Corner Stitching */}
              <div className="absolute bottom-3 right-3 z-10 text-white/30 pointer-events-none">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M0 38H38V0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* FORM PANEL (55% on desktop = 6 cols out of 10) */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-cream/30 ${
                isImageLeft ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="w-full max-w-md mx-auto space-y-6">
                {children}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Subtle Editorial Footer */}
      <footer className="relative z-20 py-3 text-center text-[11px] text-earth-muted/60 tracking-wider uppercase">
        Artful Stitches &bull; Handcrafted Embroidery &bull; &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
