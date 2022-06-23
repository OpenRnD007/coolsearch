import { useReducer } from "react";
import { LoadingIconWithLabel, LoadingSkeleton } from "../utils"
import { defaultState, searchReducer } from "./reducer";
import SearchForm from "./SearchForm"
import SearchList from "./SearchList"
import SearchPagination from "./SearchPagination";

const Search = () => {
    const [state, dispatch] = useReducer(searchReducer, defaultState)
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <SearchForm dispatch={dispatch} pageno={state.pageno} />
            {state.loader && <LoadingIconWithLabel label="Loading..." />}
            {state.totalcount > 0 && <>
                <div className="shadow-md px-2 rounded-lg bg-sky-400 text-sm text-white italic">Users: {state.totalcount.toLocaleString('en-US')}</div>
                <SearchPagination dispatch={dispatch} pageno={state.pageno ?? 1} totalcount={state.totalcount} />
            </>}
            {state.errormsg && <div className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 rounded-md shadow-sm ring-2 ring-offset-2 ring-offset-slate-50 ring-red-300 mt-3">{state.errormsg}</div>}

            <section className="results px-2 lg:grid lg:grid-cols-3 lg:gap-4 w-full h-screen overflow-y-auto scroll-smooth">
                {state.loader && <LoadingSkeleton count={3} />}
                <SearchList users={state.users} />
            </section>
        </main>
    )
}

export default Search