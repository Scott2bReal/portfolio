import { createSignal, Signal } from "solid-js";
import type { Project } from "../../types";

interface Props {
  project: Project
  anyHovered: Signal<boolean>
}

export default function ProjectCard({ project, anyHovered }: Props) {
  const { projectName, projectDescription, projectLink } = project;
  const [isHovered, setIsHovered] = createSignal(false)
  const [isAnyHovered, setIsAnyHovered] = anyHovered

  return (
    <div
      class="project-card"
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
      <div class={`transition duration-500 ease-in-out ${isAnyHovered() && !isHovered() ? `opacity-50` : `` }`}>
        <div class="">
          <a href={projectLink} target="_blank">
            <h3 class="text-2xl font-bold inline">{projectName}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class={`${isHovered() ? `animate-bounce` : ``} w-6 h-6 inline text-niceBlue hover:opacity-50 -translate-y-1`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
            </svg>
          </a>
        </div>
        <p>{projectDescription}</p>
      </div>
    </div>
  )
}
