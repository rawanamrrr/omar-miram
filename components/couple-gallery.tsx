"use client"

import { useEffect, useRef } from "react"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "@/lib/translations"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const photos = [
  {
    src: "/couple-1.jpg",
    alt: "Omar & Miram",
    filmCode: "KODAK 400TX",
    frameNumber: "12",
    date: "'26 07 31",
    caption: {
      en: "Hand in Hand",
      ar: "يداً بيد"
    }
  },
  {
    src: "/couple-2.jpg",
    alt: "Omar & Miram",
    filmCode: "ILFORD HP5",
    frameNumber: "13",
    date: "'26 07 31",
    caption: {
      en: "Our Beautiful Journey",
      ar: "رحلتنا الجميلة"
    }
  },
  {
    src: "/couple-3.jpg",
    alt: "Omar & Miram",
    filmCode: "PORTRA 160",
    frameNumber: "14",
    date: "'26 07 31",
    caption: {
      en: "Shared Smiles",
      ar: "ابتسامات مشتركة"
    }
  },
  {
    src: "/couple-4.jpg",
    alt: "Omar & Miram",
    filmCode: "FUJI PRO 400H",
    frameNumber: "15",
    date: "'26 07 31",
    caption: {
      en: "Forever Begins Now",
      ar: "الأبدية تبدأ الآن"
    }
  },
]

// Repeat photos 3 times to create seamless infinite scrolling wrapper
const displayPhotos = [...photos, ...photos, ...photos]

export default function CoupleGallery() {
  const t = useTranslation()
  const { language } = useLanguage()
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  // Handle infinite scroll wrapping
  const handleInfiniteScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth } = scrollRef.current
    const singleSetWidth = scrollWidth / 3

    if (scrollLeft >= singleSetWidth * 2) {
      scrollRef.current.scrollLeft = scrollLeft - singleSetWidth
    } else if (scrollLeft <= singleSetWidth / 2) {
      scrollRef.current.scrollLeft = scrollLeft + singleSetWidth
    }
  }

  // Set initial scroll position to the middle repeating set
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current
      const handleInitialPosition = () => {
        const singleSetWidth = scrollContainer.scrollWidth / 3
        scrollContainer.scrollLeft = singleSetWidth
      }

      // Small timeout to ensure DOM styles and widths are fully rendered
      const timer = setTimeout(handleInitialPosition, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // Auto-scroll loop
  useEffect(() => {
    let animationFrameId: number

    const scrollLoop = () => {
      if (scrollRef.current && !isDragging.current) {
        scrollRef.current.scrollLeft += 1.2 // Auto-scroll speed
        handleInfiniteScroll()
      }
      animationFrameId = requestAnimationFrame(scrollLoop)
    }

    animationFrameId = requestAnimationFrame(scrollLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Mouse Drag Events for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // Drag sensitivity
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
    handleInfiniteScroll()
  }

  const handleMouseUpOrLeave = () => {
    isDragging.current = false
  }

  // Left/Right Button Scrolling
  const scrollByButton = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = 320
    const scrollContainer = scrollRef.current
    const targetScroll = scrollContainer.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    })
    
    // Check wrapping after smooth scroll finishes
    setTimeout(handleInfiniteScroll, 400)
  }

  const renderSprockets = () => {
    return Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className="w-2.5 h-3.5 md:w-3.5 md:h-4.5 bg-[#ebebeb] dark:bg-zinc-900 rounded-[2px] opacity-90 shadow-inner border border-black/10 transition-colors duration-300"
      />
    ))
  }

  return (
    <motion.section
      className="relative py-8 px-0 md:py-12 bg-transparent overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      {/* Projection light glow behind the strip */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-amber-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Film Strip Gallery Container */}
        <div className="w-full relative px-0 flex items-center group/slider">
          
          {/* Navigation Button Left */}
          <button
            onClick={() => scrollByButton("left")}
            className="hidden md:flex absolute left-4 z-20 w-11 h-11 rounded-full border border-[#d9675f]/20 bg-[#1c1917]/90 text-white items-center justify-center cursor-pointer shadow-lg hover:scale-105 hover:bg-[#d9675f] transition-all opacity-0 group-hover/slider:opacity-100 duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Film Strip Horizontal Scroll View */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto scrollbar-none flex flex-row cursor-grab active:cursor-grabbing select-none border-y-2 border-[#2d2522] bg-[#1a1716] shadow-[0_15px_40px_rgba(0,0,0,0.35)] py-0"
            onScroll={handleInfiniteScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={() => { isDragging.current = true }}
            onTouchEnd={() => { isDragging.current = false }}
            onTouchCancel={() => { isDragging.current = false }}
          >
            <div className="flex flex-row min-w-max">
              {displayPhotos.map((photo, index) => {
                const originalIndex = index % photos.length
                
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[290px] md:w-[410px] bg-[#1a1716] flex flex-col relative border-r-[12px] md:border-r-[18px] border-[#1a1716] select-none group"
                  >
                    {/* Top Film Sprocket Row */}
                    <div className="h-8 md:h-10 flex items-center justify-around px-2 select-none border-b border-black/20">
                      {renderSprockets()}
                    </div>

                    {/* Top Margins & Code Markings */}
                    <div className="h-5 flex justify-between items-center px-4 font-mono text-[8px] md:text-[9px] text-amber-600/50 uppercase tracking-wider select-none">
                      <span>{photo.filmCode}</span>
                      <span className="text-[7px] md:text-[8px] tracking-widest text-[#d9675f]/50">•••• IIII ••••</span>
                    </div>

                    {/* Photo Content Frame with Sepia/Warm Tint */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-y border-black/60 bg-[#2d2522]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 290px, 410px"
                        className="object-cover sepia-[0.25] contrast-[1.08] brightness-[0.97] saturate-[0.85]"
                        draggable={false}
                      />

                      {/* Retro camera timestamp */}
                      <div className="absolute bottom-2 right-3 font-mono text-[10px] md:text-[12px] font-bold text-orange-500 tracking-widest drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)] opacity-90">
                        {photo.date}
                      </div>
                    </div>

                    {/* Bottom Margins, Frame Numbers & Labels */}
                    <div className="h-6 flex justify-between items-center px-4 font-mono text-[8px] md:text-[9px] text-amber-600/50 uppercase tracking-wider select-none">
                      <span className="font-semibold text-orange-500/80">FN {photo.frameNumber}</span>
                      <span className="font-semibold text-orange-500/80">{originalIndex + 1}A</span>
                    </div>

                    {/* Bottom Film Sprocket Row */}
                    <div className="h-8 md:h-10 flex items-center justify-around px-2 select-none border-t border-black/20">
                      {renderSprockets()}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Button Right */}
          <button
            onClick={() => scrollByButton("right")}
            className="hidden md:flex absolute right-4 z-20 w-11 h-11 rounded-full border border-[#d9675f]/20 bg-[#1c1917]/90 text-white items-center justify-center cursor-pointer shadow-lg hover:scale-105 hover:bg-[#d9675f] transition-all opacity-0 group-hover/slider:opacity-100 duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Tiny retro reels indicator */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          variants={fadeIn}
        >
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-3 bg-stone-700 rounded-[1px]"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
