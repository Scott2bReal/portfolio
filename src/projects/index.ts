import type { Project } from "../types"
import { handshake } from "./handshake"
import { religion } from "./religion"
import { robocap } from "./robocap"
import { snackbot } from "./snackbot"
import { snacksSite } from "./snacksSite"
import { sva } from "./sva"
import { youthRec } from "./youthRec"

export const PROJECTS: Project[] = [youthRec, snacksSite, snackbot, robocap]
export const WORK: Project[] = [handshake, sva, religion]
