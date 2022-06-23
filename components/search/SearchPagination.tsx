import { useEffect, useState } from "react"
import { Dispatch } from "./reducer"

const SearchPagination = (props: { dispatch: Dispatch, pageno: number, totalcount: number }) => {
    const [pageInfo, setPageInfo] = useState<{ start: number, end: number }>({ start: 0, end: 0 })

    useEffect(() => {
        if (props.pageno) {
            const pinfo = {
                start: (props.pageno > 1) ? (props.pageno - 1) * 100 : 1,
                end: props.pageno * 100
            }
            if (pinfo["end"] >= props.totalcount) {
                pinfo["end"] = props.totalcount
            }
            setPageInfo(pinfo)
        }
    }, [props.pageno])
    return (
        <div className="mt-2">
            <span className="mt-3 cursor-pointer" onClick={() => {
                props.dispatch({
                    "type": "paginateAction",
                    "payload": { "action": "first" }
                })
            }}>{"<<"}</span>
            <span className="ml-3 cursor-pointer" onClick={() => {
                props.dispatch({
                    "type": "paginateAction",
                    "payload": { "action": "prev" }
                })
            }}>{"<"}</span>
            <span className="ml-3 px-1.5 ring-1 ring-blue-300 rounded">
                {pageInfo["start"]} - {pageInfo["end"]}
            </span>
            <span className="ml-3 cursor-pointer" onClick={() => {
                props.dispatch({
                    "type": "paginateAction",
                    "payload": { "action": "next" }
                })
            }}>{">"}</span>
            <span className="ml-3 cursor-pointer" onClick={() => {
                props.dispatch({
                    "type": "paginateAction",
                    "payload": { "action": "last" }
                })
            }}>{">>"}</span>
        </div>
    )
}

export default SearchPagination