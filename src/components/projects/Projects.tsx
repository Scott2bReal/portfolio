import { createSignal, For } from "solid-js";
import { PROJECTS } from '../../projects'
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const anyHovered = createSignal(false)

  return (
    <div class="flex lg:flex-row flex-col gap-8 justify-center p-2 items-stretch flex-wrap">
      <For each={PROJECTS}>
        {(project) => (
          <ProjectCard anyHovered={anyHovered} project={project} />
        )}
      </For>
    </div>
  )
}
