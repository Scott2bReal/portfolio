import { createContext, type Accessor, type Setter } from "solid-js"

type ProjectCardContextType = [Accessor<boolean>, Setter<boolean>]

export const ProjectCardContext = createContext<ProjectCardContextType>()
