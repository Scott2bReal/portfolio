import { createSignal, Signal } from "solid-js";
import type { Project } from "../../types";

interface Props {
  project: Project;
  anyHovered: Signal<boolean>;
}

export default function ProjectCard({ project, anyHovered }: Props) {
  const { projectName, projectDescription, projectLink } = project;
  const [isHovered, setIsHovered] = createSignal(false);
  const [isAnyHovered, setIsAnyHovered] = anyHovered;

  return (
    <a
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
      class="project-card"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsAnyHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsAnyHovered(false);
      }}
      id={projectName + projectLink}
    >
      <div
        class={`transition duration-500 ease-in-out ${isAnyHovered() && !isHovered() ? `opacity-50` : ``
          }`}
      >
        <h3 class={`inline text-2xl font-bold`}>{projectName}</h3>
        <p class="mx-auto max-w-[80%] opacity-90 lg:max-w-full">
          {projectDescription}
        </p>
      </div>
    </a>
  );
}
