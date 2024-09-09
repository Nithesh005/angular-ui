import { createReducer, on } from '@ngrx/store'
import { changeDir, changeLayout, toggleDarkMode } from './actions'
import { layoutList } from '@component/shared/theme-customizer/theme-customizer.component'

export interface LayoutState {
  layout: string
  dir: string
  theme: string
}

export const initialState: LayoutState = {
  layout: localStorage.getItem('layout') || layoutList[0],
  dir: localStorage.getItem('dir') || 'ltr',
  theme: localStorage.getItem('theme') || 'light'
}

export const layoutReducer = createReducer(
  initialState,
  on(toggleDarkMode, (state, {newTheme}) => ({
    ...state,
    theme: newTheme
  })),
  on(changeDir, (state, { newDir }) => ({
    ...state,
    dir: newDir
  })),
  on(changeLayout, (state, { newLayout }) => ({
    ...state,
    layout: newLayout
  }))
)
