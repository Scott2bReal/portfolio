import type { Project } from "../types";
import { robocap } from "./robocap";
import { snackbot } from "./snackbot";
import { snacksSite } from "./snacksSite";
import { youthRec } from "./youthRec";

export const PROJECTS: Project[] = [youthRec, snacksSite, snackbot, robocap]
