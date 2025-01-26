import { createSignal, useContext, type JSXElement } from "solid-js"
import { ProjectCardContext } from "./ProjectCardContext"

interface Props {
  children: JSXElement
}

export const useProjectCardContext = () => {
  const ctx = useContext(ProjectCardContext)
  if (!ctx) {
    throw new Error("useProjectCardContext must be used within a CardProvider")
  }
  return ctx
}

const CardProvider = (props: Props) => {
  const [isAnyHovered, setIsAnyHovered] = createSignal(false)
  return (
    <ProjectCardContext.Provider value={[isAnyHovered, setIsAnyHovered]}>
      {props.children}
    </ProjectCardContext.Provider>
  )
}

export default CardProvider
