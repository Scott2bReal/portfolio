import { createSignal } from "solid-js"
import { useProjectCardContext } from "../../context/CardProvider"
import type { Project } from "../../types"

interface Props {
  project: Project
}

export default function ProjectCard(props: Props) {
  const [isHovered, setIsHovered] = createSignal(false)
  const [isAnyHovered, setIsAnyHovered] = useProjectCardContext()

  return (
    <a
      href={props.project.projectLink}
      target="_blank"
      rel="noopener noreferrer"
      class="group flex-1 rounded-xl border border-niceGreen p-4 text-center shadow-lg shadow-neutral-900 transition duration-300 ease-in-out hover:scale-[102%] focus-visible:outline focus-visible:outline-niceGreen"
      onMouseEnter={() => {
        setIsHovered(true)
        setIsAnyHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsAnyHovered(false)
      }}
      id={props.project.projectName + props.project.projectLink}
    >
      <div
        class={`flex flex-col gap-4 transition duration-500 ease-in-out ${isAnyHovered() && !isHovered() ? `opacity-50` : ``
          }`}
      >
        <h3 class={`inline text-2xl font-bold`}>{props.project.projectName}</h3>
        {props.project.imageSrc && (
          <img
            alt={props.project.projectName}
            class="rounded-md transition duration-500 ease-in-out group-hover:scale-[100%]"
            src={props.project.imageSrc}
          />
        )}
        <p class="mx-auto mt-2 max-w-[80%] opacity-90 lg:max-w-full">
          {props.project.projectDescription}
        </p>
      </div>
    </a>
  )
}
