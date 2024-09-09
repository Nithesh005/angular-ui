import { createAction, props } from '@ngrx/store';

export const toggleDarkMode = createAction('[Layout] Toggle Dark Mode',props<{ newTheme: string }>());
export const changeDir = createAction('[Layout] Change Direction', props<{ newDir: string }>());
export const changeLayout = createAction('[Layout] Change Layout', props<{ newLayout: string }>());


