import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { Project } from "../../../types"
import "./ProjectSelector.css"

const projects: Project[] = [
  { name: "born into this", tag: "rnb" },
  { name: "no name", tag: "synthwave" },
  { name: "run", tag: "hardtechno" },
  { name: "water", tag: "boombap" },
  { name: "sleep", tag: "rnb" }
]

export const ProjectSelector = () => {
  const projectCount = projects.length
  const itemOffset = 400

  const currentIndex = useRef(0)
  const scrollPosition = useRef(0)

  const getTrueScrollPos = (offsetX: number) => {
    return offsetX + scrollPosition.current
  }

  const getDistanceToSelection = (i: number) => {
    return Math.abs(i - currentIndex.current)
  }

  // maps scroll position to itemIndex
  const toIndex = (num: number) => {
    const rounded = Math.round(num) * -1
    return Math.max(0, Math.min(rounded, projectCount - 1))
  }
  // works
  const getRelativeOffsetForCurrentIndex = (index: number) => {
    return (index - currentIndex.current) * itemOffset
  }

  const scroll = (offsetX: number) => {
    currentIndex.current = toIndex(getTrueScrollPos(offsetX) / itemOffset)

    api.start((i) => {
      let offset = 0
      if (
        currentIndex.current === projectCount - 1 ||
        currentIndex.current === 0
      ) {
        offset = getRelativeOffsetForCurrentIndex(i)
      } else {
        offset = i * itemOffset + getTrueScrollPos(offsetX)
      }
      return {
        x: offset,
        scale: 1 - getDistanceToSelection(i) * 0.2,
        rotateZ: getDistanceToSelection(i) * 10,
        opacity: currentIndex.current > i ? 0 : 1
      }
    })
  }

  const snap = () => {
    scrollPosition.current = currentIndex.current * itemOffset * -1

    api.start((i) => ({
      x: getRelativeOffsetForCurrentIndex(i)
    }))
  }

  const [props, api] = useSprings(projectCount, (i) => ({
    x: i * itemOffset,
    scale: 1,
    rotateZ: 0,
    opacity: 1,
    display: "block",
    ...springConfig
  }))

  const scrollScale = 0.4
  const bind = useGesture({
    onDrag: (state) => scroll(state.movement[0]),
    onDragEnd: () => snap(),
    onWheel: (state) => scroll(state.movement[1] * scrollScale),
    onWheelEnd: () => snap()
  })

  return (
    <>
      <div className="project-wrapper" {...bind()}>
        {props.map(({ x, scale, rotateZ, opacity, display }, i) => (
          <a.div
            className="project"
            style={{
              x,
              scale,
              rotateZ,
              opacity,
              zIndex: projectCount - i
            }}
            key={i}
          >
            {projects[i].name}
          </a.div>
        ))}
      </div>
    </>
  )
}
