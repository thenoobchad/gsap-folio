import { useGSAP } from "@gsap/react"
import { useRef } from "react"


export const AnimatedTextLines = ({ text, className }) => {
    const containerRef = useRef(null)
    const lineRefs = useRef([])
    const lines = text.split("\n").filter((line) => line.trim() !== "")

    useGSAP(() => {}, [])
  return (
      <div className={className} ref={containerRef}>
          {
              lines.map((line, index) => (
                  <span key={index} ref={(el) => (lineRefs.current[index] = el)} className="block leading-relaxed tracking-wide text-pretty">{line}</span>
              ))
          }
    </div>
  )
}
