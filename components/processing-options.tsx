"use client"
import { motion, AnimatePresence } from "framer-motion"

interface ProcessingOptionsProps {
  selectedUpscale: "2x" | "4x" | null
  setSelectedUpscale: (value: "2x" | "4x" | null) => void
  selectedAspectRatio: "portrait" | "landscape" | null
  setSelectedAspectRatio: (value: "portrait" | "landscape" | null) => void
  repaintPrompt: string
  setRepaintPrompt: (value: string) => void
}

export default function ProcessingOptions({
  selectedUpscale,
  setSelectedUpscale,
  selectedAspectRatio,
  setSelectedAspectRatio,
  repaintPrompt,
  setRepaintPrompt,
}: ProcessingOptionsProps) {
  const handleUpscaleSelect = (value: "2x" | "4x") => {
    if (selectedUpscale === value) {
      setSelectedUpscale(null)
    } else {
      setSelectedUpscale(value)
    }
  }

  const handleAspectRatioSelect = (value: "portrait" | "landscape") => {
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
      </div>

      {/* Aspect Ratio Conversion */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-medium mb-3">Convert Aspect Ratio (Repaint)</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <OptionCard
            title="Portrait to Landscape"
            description="Add content to the sides"
            isSelected={selectedAspectRatio === "landscape"}
            onClick={() => handleAspectRatioSelect("landscape")}
          />
          <OptionCard
            title="Landscape to Portrait"
            description="Add content to top/bottom"
            isSelected={selectedAspectRatio === "portrait"}
            onClick={() => handleAspectRatioSelect("portrait")}
          />
        </div>

        <AnimatePresence>
          {selectedAspectRatio && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
                  Enter prompt for repainted area
                </label>
                <input
                  type="text"
                  id="prompt"
                  value={repaintPrompt}
                  onChange={(e) => setRepaintPrompt(e.target.value)}
                  placeholder="Describe what should be added to the extended areas..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
