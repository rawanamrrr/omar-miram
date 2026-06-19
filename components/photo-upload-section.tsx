"use client"

import { motion, Variants } from "framer-motion"
import { useTranslation } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Camera, Upload } from "lucide-react"

// Professional animation variants matching the main page
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

const scaleIn: Variants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const slideUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 }
  }
}

export default function PhotoUploadSection() {
  const t = useTranslation()
  
  const driveLink = "https://drive.google.com/drive/folders/1VwN90MVOlKeO9zLkPeBdYIajbxtstuGA?usp=drive_link"

  const handleUploadClick = () => {
    if (driveLink) {
      window.open(driveLink, "_blank")
    }
  }

  return (
    <motion.section 
      className="relative py-12 px-4 md:py-16 bg-transparent overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fastStaggerContainer}
    >
      <div className="relative max-w-lg mx-auto text-center flex flex-col items-center">
        {/* Title */}
        <motion.h2 
          className="font-handwritten text-5xl md:text-7xl text-[#d9675f] mb-4 tracking-tight leading-[1.2]"
          variants={slideUp}
        >
          {t('sharePhotosTitle')}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="font-serif text-base md:text-lg text-[#d9675f]/70 italic mb-10 max-w-md leading-relaxed px-4"
          variants={fadeIn}
        >
          {t('sharePhotosDescription')}
        </motion.p>

        {/* QR Code Card */}
        <motion.div 
          className="w-full max-w-sm rounded-2xl p-6 md:p-8 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(217, 103, 95, 0.1)',
          }}
          variants={scaleIn}
        >
          {/* QR Code */}
          <motion.div 
            className="flex flex-col items-center"
            variants={fadeIn}
          >
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-[#d9675f]/10">
              <Image 
                src="/qr-code-img.png" 
                alt="QR Code" 
                width={220} 
                height={220}
                className="w-[200px] h-[200px] md:w-[220px] md:h-[220px]"
              />
            </div>

            {/* Scan Text */}
            <p className="font-serif text-lg md:text-xl text-[#d9675f] text-center mb-2 font-medium">
              {t('scanQRCode')}
            </p>
            <p className="font-serif text-sm text-[#d9675f]/60 text-center italic">
              {t('orUploadDirectly')}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#d9675f]/15" />
            <span className="text-[#d9675f]/50 font-serif text-xs uppercase tracking-[0.3em]">
              {t('or')}
            </span>
            <div className="flex-1 h-px bg-[#d9675f]/15" />
          </div>

          {/* Upload Button */}
          <motion.div
            className="flex justify-center"
            variants={fadeIn}
          >
            <button
              onClick={handleUploadClick}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 text-base font-serif text-white rounded-full shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #d9675f 0%, #c4574f 100%)',
                border: 'none',
              }}
            >
              <Upload className="w-5 h-5" strokeWidth={2} style={{ strokeWidth: '2px' }} />
              {t('uploadButton')}
            </button>
          </motion.div>

          {/* Bottom Note with Stars */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <svg className="w-4 h-4 text-[#d9675f]/50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <p className="font-serif text-sm text-[#d9675f]/60 italic text-center">
              {t('sharePhotosDescription')}
            </p>
            <svg className="w-4 h-4 text-[#d9675f]/50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </motion.div>


      </div>
    </motion.section>
  )
}
