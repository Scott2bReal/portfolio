import { For } from "solid-js"
import ProjectCard from "./ProjectCard"
import type { Project } from "../../types"
import CardProvider from "../../context/CardProvider"

interface ProjectProps {
  projects: Project[]
}

export default function Projects(props: ProjectProps) {
  return (
    <div class="flex flex-col flex-wrap items-stretch justify-center gap-8 p-2 lg:flex-row">
      <CardProvider>
        <For each={props.projects}>
          {(project) => <ProjectCard project={project} />}
        </For>
      </CardProvider>
    </div>
  )
}
