import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { layoutReducer } from "./reducer";
import { isDevMode } from "@angular/core";

export interface State {}

export const reducers: ActionReducerMap<State> = {
  layout:layoutReducer,
}

export const metaReducers:MetaReducer<State>[]=isDevMode()?[]:[]
