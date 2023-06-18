import { createSignal, For } from "solid-js";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../types";

interface ProjectProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectProps) {
  const anyHovered = createSignal(false);

  return (
    <div class="flex flex-col flex-wrap items-stretch justify-center gap-8 p-2 lg:flex-row">
      <For each={projects}>
        {(project) => <ProjectCard anyHovered={anyHovered} project={project} />}
      </For>
    </div>
  );
}
