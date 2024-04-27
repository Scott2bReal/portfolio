import { createSignal, type Signal } from "solid-js"
import type { Project } from "../../types"

interface Props {
  project: Project
  anyHovered: Signal<boolean>
}

export default function ProjectCard({ project, anyHovered }: Props) {
  const { projectName, projectDescription, projectLink, imageSrc } = project
  const [isHovered, setIsHovered] = createSignal(false)
  const [isAnyHovered, setIsAnyHovered] = anyHovered

  return (
    <a
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
      class="flex-1 rounded-xl p-4 text-center group shadow-lg shadow-neutral-900 outline outline-niceGreen transition duration-300 ease-in-out hover:scale-[102%] hover:shadow-lg hover:shadow-mainText"
      onMouseEnter={() => {
        setIsHovered(true)
        setIsAnyHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsAnyHovered(false)
      }}
      id={projectName + projectLink}
    >
      <div
        class={`flex flex-col gap-4 transition duration-500 ease-in-out ${
          isAnyHovered() && !isHovered() ? `opacity-50` : ``
        }`}
      >
        <h3 class={`inline text-2xl font-bold`}>{projectName}</h3>
        {imageSrc && <img alt={projectName} class="rounded-md group-hover:scale-[100%] transition duration-500 ease-in-out" src={imageSrc} />}
        <p class="mx-auto mt-2 max-w-[80%] opacity-90 lg:max-w-full">
          {projectDescription}
        </p>
      </div>
    </a>
  )
}
