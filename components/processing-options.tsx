"use client"
import { motion, AnimatePresence } from "framer-motion"

interface ProcessingOptionsProps {
  selectedUpscale: "2x" | "4x" | null
  setSelectedUpscale: (value: "2x" | "4x" | null) => void
  selectedAspectRatio: "l2p" | "p2l" | null
  setSelectedAspectRatio: (value: "l2p" | "p2l" | null) => void

}

export default function ProcessingOptions({
  selectedUpscale,
  setSelectedUpscale,
  selectedAspectRatio,
  setSelectedAspectRatio,
}: ProcessingOptionsProps) {
  const handleUpscaleSelect = (value: "2x" | "4x") => {
    if (selectedUpscale === value) {
      setSelectedUpscale(null)
    } else {
      setSelectedUpscale(value)
    }
  }

  const handleAspectRatioSelect = (value: "l2p" | "p2l") => {
    if (selectedAspectRatio === value) {
      setSelectedAspectRatio(null)
    } else {
      setSelectedAspectRatio(value)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upscaling Options */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-medium mb-3">Upscale Image</h3>
        <div className="grid grid-cols-2 gap-3">
          <OptionCard
            title="Upscale 2x"
            description="Double the resolution"
            isSelected={selectedUpscale === "2x"}
            onClick={() => handleUpscaleSelect("2x")}
          />
          <OptionCard
            title="Upscale 4x"
            description="Quadruple the resolution"
            isSelected={selectedUpscale === "4x"}
            onClick={() => handleUpscaleSelect("4x")}
          />
        </div>
        {/* Remove face enhancement checkbox */}
      </div>

      {/* Aspect Ratio Conversion */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-medium mb-3">Convert Aspect Ratio (Repaint)</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <OptionCard
            title="Portrait to Landscape"
            description="Add content to the sides"
            isSelected={selectedAspectRatio === "p2l"}
            onClick={() => handleAspectRatioSelect("p2l")}
          />
          <OptionCard
            title="Landscape to Portrait"
            description="Add content to top/bottom"
            isSelected={selectedAspectRatio === "l2p"}
            onClick={() => handleAspectRatioSelect("l2p")}
          />
        </div>

        {/* Removed AnimatePresence block for repaint prompt */}
      </div>
    </div>
  )
}

interface OptionCardProps {
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}

function OptionCard({ title, description, isSelected, onClick }: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg p-3 border transition-all duration-200 ${
        isSelected ? "border-teal-400 bg-teal-400/10" : "border-gray-600 hover:border-gray-500"
      }`}
    >
      <div className="flex items-start">
        <div
          className={`w-4 h-4 rounded-full mr-2 mt-1 border-2 flex-shrink-0 ${
            isSelected ? "border-teal-400 bg-teal-400" : "border-gray-500"
          }`}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full rounded-full bg-white scale-50"
            />
          )}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
