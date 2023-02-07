import { createSignal, For } from 'solid-js'
import { PROJECTS } from '../../projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const anyHovered = createSignal(false)

  return (
    <div class='flex flex-col flex-wrap items-stretch justify-center gap-8 p-2 lg:flex-row'>
      <For each={PROJECTS}>
        {(project) => <ProjectCard anyHovered={anyHovered} project={project} />}
      </For>
    </div>
  )
}
