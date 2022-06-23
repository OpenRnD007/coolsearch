import { useEffect, useState } from "react";
import { useIsMounted } from "../utils/useIsMounted";
import { Dispatch } from "./reducer";

const SearchForm = (props: { dispatch: Dispatch, pageno?: number }) => {

    const [searchText, setSearchText] = useState<string>("");
    const isMounted = useIsMounted();

    const searchUser = (blankText?: boolean) => {
        const srch = blankText ? "" : searchText.trim()
        props.dispatch({
            "type": "list",
            "payload": { "data": [] }
        });
        if (srch) {
            props.dispatch({
                "type": "showLoading",
                "payload": { "show": true }
            });
            fetch('/api/users/?user=' + srch + '&page=' + (props.pageno ?? 1))
                .then(response => response.json())
                .then(
                    (data) => {
                        if (!isMounted()) return;
                        props.dispatch({
                            "type": "list",
                            "payload": {
                                "data": data.items ?? [],
                                "totalcount": data.total_count ?? 0
                            }
                        });
                        if (data.message) {
                            props.dispatch({
                                "type": "error",
                                "payload": {
                                    "errormsg": "Github API rate limit exceeded, Please Search again"
                                }
                            });
                        }
                    },
                    (err) => {
                        if (err && isMounted()) {
                            props.dispatch({
                                "type": "error",
                                "payload": {
                                    "errormsg": err
                                }
                            });
                        }
                    })
                .finally(() => {
                    if (isMounted()) props.dispatch({
                        "type": "showLoading",
                        "payload": { "show": false }
                    });
                })
        }
    }

    useEffect(() => {
        if (props.pageno) {
            searchUser()
        }
    }, [props.pageno])

    return (
        <section className="search">
            <div className="bg-white flex mt-3 justify-center items-center">
                <h1 className="font-semibold text-slate-900">Github Search</h1>
            </div>
            <div className="text-slate-400 text-xs flex justify-center items-center mb-4">Note: Only 1000 search result is allowed by github</div>
            <form onSubmit={(event) => {
                event.preventDefault();
                props.dispatch({
                    "type": "paginate",
                    "payload": { "pageno": 1 }
                })
                searchUser()
            }}>
                <div className="flex justify-center items-center gap-2 mb-2">
                    <div className="group relative">
                        <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        <input
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 rounded-md py-2 pl-10 pr-10 ring-1 ring-slate-400 shadow-sm"
                            type="text"
                            aria-label="Search Users"
                            placeholder="Search Users..."
                            value={searchText}
                            onChange={(e => setSearchText(e.target.value))} />
                    </div>
                    <button
                        type="submit"
                        className="hover:bg-sky-600 w-20 px-3 py-2 rounded-md bg-sky-500 text-white cursor-pointer text-center"
                    >Search</button>
                    <button
                        onClick={() => {
                            setSearchText("")
                            searchUser(true)
                        }}
                        type="button"
                        className="hover:bg-slate-600 w-16 px-2 py-2 rounded-md bg-slate-500 text-white cursor-pointer text-center"
                    >Clear</button>
                </div>
            </form>
        </section>
    )

}

export default SearchForm