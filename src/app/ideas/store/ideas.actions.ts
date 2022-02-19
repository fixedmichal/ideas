import { Action } from "@ngrx/store/src/models";
import { Idea } from "src/app/shared/idea.model";

export const ADD_IDEA = 'ADD_IDEA';

export class AddIdea implements Action {
    readonly type = ADD_IDEA;
    payload: Idea;
}