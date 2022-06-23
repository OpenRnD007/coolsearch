import { IUser } from "./userInterface";

/**
 * @type ActionPayloads
 * @description Valid Action Payloads Parameters
 **/
type ActionPayloads = {
    data?: Array<IUser>,
    show?: boolean,
    totalcount?: number,
    pageno?: number,
    action?: 'next' | 'prev' | 'first' | 'last',
    errormsg?: string
}

/**
 * @type Action
 * @default {type: string, payload: ActionPayloads}
 * @description Users Reducer action
 */
export type Action = { type: 'list' | 'showLoading' | 'paginate' | 'paginateAction' | 'error', payload: ActionPayloads };

/**
 * @type State
 * @default `{ data: any }`
 * @description Reducer default State
 */
export type State = { users: Array<IUser>, loader: boolean, totalcount: number, pageno?: number, errormsg?: string };

/**
 * @type Dispatch
 * @default (action: Action) => void
 * @description Reducer Dispatch function
 */
export type Dispatch = (action: Action) => void

export const defaultState: State = { users: [], loader: false, totalcount: 0 }

/**
 * searchReducer handles functionalities `'list' | 'showLoading' | 'paginate' | 'paginateAction' | 'error'`
 * @param searchState: State
 * @param action: Action
 * @returns updated State
 */
export const searchReducer = (searchState: State, action: Action) => {

    switch (action.type) {

        /** add complete github users Array */
        case 'list': {
            return {
                ...searchState,
                users: action.payload.data!,
                totalcount: action.payload.totalcount!,
                errormsg: ""
            }
        }

        /** show loading icon while ajax call */
        case 'showLoading': {
            return {
                ...searchState,
                loader: action.payload.show!
            }
        }

        /** paginate */
        case 'paginate': {
            return {
                ...searchState,
                pageno: action.payload.pageno!
            }
        }

        /** paginate */
        case 'paginateAction': {
            let pageno = 1;
            if (action.payload.action === "last") {
                pageno = 10; //only 1000 result are permitted
            }
            if (action.payload.action === "next") {
                pageno = (searchState.pageno ?? 1) + 1;
                if (pageno > 10) { //only 1000 result are permitted
                    pageno = 10;
                }
            }
            if (action.payload.action === "prev") {
                pageno = (searchState.pageno ?? 1) - 1;
                if (pageno < 1) {
                    pageno = 1;
                }
            }
            if (searchState.totalcount && pageno > (searchState.totalcount / 100)) { // if result is less than 
                pageno = Math.ceil((searchState.totalcount / 100));
                if (pageno < 1) pageno = 1;
            }
            return {
                ...searchState,
                pageno: pageno
            }
        }

        /** Error message */
        case 'error': {
            return {
                ...searchState,
                errormsg: action.payload.errormsg!
            }
        }

        default: {
            return searchState;
        }
    }
}