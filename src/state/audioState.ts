import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { projectList } from "../project-list"
import { Project } from "../types"
import {
  prioritizeByTag,
  selectAndPlayProjectByName,
  selectNextProject,
  selectPreviousProject,
  selectProjectByName
} from "./audioStateReducers"

export type AudioState = {
  isPlaying: boolean
  isLooping: boolean
  selectedProject: Project
  projectList: Project[]
  audio: HTMLAudioElement
  selectedTag: string | null
  selectProject: (name: string) => void
  selectAndPlayProject: (name: string) => void
  selectTag: (tag: string) => void
  togglePlay: () => void
  toggleLoop: () => void
  pause: () => void
  skip: (time: number) => void
  selectNext: () => void
  selectPrevious: () => void
}

const getProjectFromSearchParam = (): Project | undefined => {
  const searchParams = new URLSearchParams(window.location.search)
  const sharedProjectName = searchParams.get("project")
  return projectList.find((project) => project.name === sharedProjectName)
}

const initialProject = projectList[0]

const initialState = {
  isPlaying: false,
  selectedProject: initialProject,
  projectList: projectList,
  selectedTag: null,
  isLooping: false,
  audio: new Audio(initialProject.fileName)
}

export const useAudioStore = create<AudioState>()(
  devtools((set, get) => ({
    ...initialState,
    selectProject: (name: string) =>
      set((state) => selectProjectByName(name, state)),
    selectAndPlayProject: (name: string) =>
      set((state) => selectAndPlayProjectByName(name, state)),
    selectTag: (tag: string) => set((state) => prioritizeByTag(tag, state)),
    togglePlay: () =>
      set((state) => ({ ...state, isPlaying: !state.isPlaying })),
    toggleLoop: () =>
      set((state) => ({ ...state, isLooping: !state.isLooping })),
    pause: () => set((state) => ({ ...state, isPlaying: false })),
    skip: (time) => (get().audio.currentTime += time),
    selectNext: () => set((state) => selectNextProject(state)),
    selectPrevious: () => set((state) => selectPreviousProject(state))
  }))
)
