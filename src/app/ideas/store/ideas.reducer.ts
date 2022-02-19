import * as IdeasActions from './ideas.actions'
const initialState = {
    ideas: []
}

export function ideasReducer(
    state = initialState,
     action: IdeasActions.AddIdea) {
    switch(action.type) {
        case IdeasActions.ADD_IDEA:
            return {
                ...state,
                ideas: [...state.ideas, action.payload]
            }
    }
}