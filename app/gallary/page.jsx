"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Camera, Scissors, X, Calendar, Clock, ArrowRight, Eye } from "lucide-react";

const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Classic Pompadour",
    category: "haircuts",
    description: "A timeless classic featuring structured volume on top, sleek tapered sides, and a high-gloss premium finish. Ideal for the refined gentleman who values sharp structure.",
    image: "/haircutting.jpg",
    price: "₹150",
    duration: "30 mins",
  },
  {
    id: "g2",
    title: "Textured Crop Skin Fade",
    category: "haircuts",
    description: "A contemporary skin fade paired with rich, messy texture on top. Styled with a premium matte clay for a modern, effortless, yet sharp look.",
    image: "/modern_fade.png",
    price: "₹150",
    duration: "30 mins",
  },
  {
    id: "g3",
    title: "Executive Side Part",
    category: "haircuts",
    description: "A clean razor-etched side part with a tight side blend. A sophisticated look that stays crisp, tidy, and absolutely immaculate in any boardroom.",
    image: "/barbershop.jpg",
    price: "₹150",
    duration: "30 mins",
  },
  {
    id: "g4",
    title: "Royal Beard Grooming",
    category: "beards",
    description: "Premium beard shaping, detailing, and trimming contoured exactly to your facial structure. Finished with premium organic beard wash, heat therapy, and conditioning beard oils.",
    image: "/beard_grooming.png",
    price: "₹150",
    duration: "20 mins",
  },
  {
    id: "g5",
    title: "Traditional Hot Towel Shave",
    category: "shaves",
    description: "A ultra-relaxing traditional shaving ritual using a sterile straight razor, hot steam, pre-shave aromatic oils, rich warm lather, and finished with refreshing cold towels and aftershave balm.",
    image: "/shaves.jpg",
    price: "₹200",
    duration: "35 mins",
  },
  {
    id: "g6",
    title: "Precision Beard Sculpt",
    category: "beards",
    description: "Clean razor lining and precision length sculpting. Perfect for maintaining a sharp, symmetrical outline and tight contours.",
    image: "/beardCut.jpg",
    price: "₹150",
    duration: "20 mins",
  }
];

const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "haircuts", label: "Haircuts" },
  { id: "beards", label: "Beard Trims" },
  { id: "shaves", label: "Hot Shaves" }
];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Banner Section */}
      <div className="relative h-[45vh] md:h-[50vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Glassmorphism Overlay */}
        <div 
          className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-10000 ease-out hover:scale-100"
        />
       
        <div className="relative z-10 text-center px-4 max-w-3xl">          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">Style Gallery</span>
          </h1>
          
          <p className="text-base md:text-xl text-white dark:text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Discover a visual chronicle of sharp fades, pristine trims, and ultimate grooming rituals sculpted by the master craftsmen at BarberShop.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-10 relative z-20">
        
        {/* Dynamic Navigation Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-sm ${
                activeFilter === cat.id
                  ? "bg-linear-to-r from-red-500 to-red-600 text-white shadow-red-500/20 shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 hover:text-red-500 hover:scale-102"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Premium Image Container */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden">
                {/* Fallback to barbershop.jpg if specific image has issues */}
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "/barbershop.jpg";
                  }}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                
                {/* Micro-Interaction Indicator icon */}
                <div className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Eye size={18} />
                </div>

                {/* Price Tag badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-red-600/90 backdrop-blur-sm text-white text-sm font-bold shadow-md">
                  {item.price}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
                    {item.category === "haircuts" ? "HAIRCUT" : item.category === "beards" ? "BEARD STYLE" : "HOT SHAVE"}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs gap-1">
                    <Clock size={12} />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center text-red-500 dark:text-red-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>View Hair Style Details</span>
                  <ArrowRight size={16} className="ml-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
            <Scissors size={48} className="mx-auto text-gray-400 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No styles found</h3>
            <p className="text-sm text-gray-500 mt-1">Check back soon for new mastercuts!</p>
          </div>
        )}
      </div>

      {/* Premium Lightbox Modal overlay with glassmorphic design */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-fadeIn">
          
          {/* Backdrop Close Click */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedItem(null)} />

          {/* Modal Card wrapper */}
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10 animate-scaleUp z-10 flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors border border-white/10 cursor-pointer shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Lightbox Image representation */}
            <div className="md:w-1/2 relative h-72 md:h-auto min-h-80 bg-slate-950 flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                onError={(e) => {
                  e.target.src = "/barbershop.jpg";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-red-600 text-white text-lg font-black shadow-lg">
                {selectedItem.price}
              </div>
            </div>

            {/* Lightbox Information Details column */}
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 text-xs font-semibold tracking-wider uppercase mb-4 border border-red-500/20">
                  {selectedItem.category === "haircuts" ? "Signature Haircut" : selectedItem.category === "beards" ? "Premium Beard Art" : "Royal Wet Shave"}
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
                  {selectedItem.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                  {selectedItem.description}
                </p>

                {/* Duration Metadata */}
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-150 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm">
                    <Clock size={16} className="text-red-500" />
                    <span>Duration: <strong>{selectedItem.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-150 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm">
                    <Calendar size={16} className="text-red-500" />
                    <span>Availability: <strong>Wed - Mon</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button CTA to Book */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                <Link
                  href={`/book`}
                  className="flex-1 text-center py-3.5 px-6 font-bold bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300 scale-100 hover:scale-[1.02]"
                  onClick={() => setSelectedItem(null)}
                >
                  Book Appointment Now
                </Link>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="py-3.5 px-6 font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl transition-colors duration-300"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
