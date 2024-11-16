import { Project } from "../types"
import { AudioState } from "./audioState"

export const selectProjectByName = (
  name: string,
  state: AudioState
): AudioState => ({
  ...state,
  selectedProject: getProjectByName(name, state)
})

export const selectAndPlayProjectByName = (
  name: string,
  state: AudioState
): AudioState => ({
  ...state,
  selectedProject: getProjectByName(name, state),
  isPlaying: true
})

export const prioritizeByTag = (tag: string, state: AudioState): AudioState => {
  const prioritizedProjects = [
    ...state.projectList.filter((project) => project.tag === tag),
    ...state.projectList.filter((project) => project.tag !== tag)
  ]

  return {
    ...state,
    selectedTag: tag,
    projectList: prioritizedProjects
  }
}

export const selectNextProject = (state: AudioState): AudioState => {
  const index = getSelectedProjectIndex(state)
  const hasNextProejct = index < state.projectList.length - 1
  const nextProject = hasNextProejct
    ? state.projectList[index + 1]
    : state.projectList[0]

  return {
    ...state,
    selectedProject: nextProject
  }
}

export const selectPreviousProject = (state: AudioState): AudioState => {
  const index = getSelectedProjectIndex(state)
  const hasPreviousProject = index !== 0
  const previousProject = hasPreviousProject
    ? state.projectList[index - 1]
    : state.projectList[state.projectList.length - 1]

  return {
    ...state,
    selectedProject: previousProject
  }
}

const getSelectedProjectIndex = (state: AudioState): number =>
  state.projectList.findIndex(
    (project) => project.name === state.selectedProject.name
  )

const getProjectByName = (name: string, state: AudioState): Project =>
  state.projectList.find((project) => project.name === name)!
