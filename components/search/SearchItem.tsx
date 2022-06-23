import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "../utils/useIsMounted";
import useOnScreen from "../utils/useOnScreen";
import { IUser, IUserBio } from "./reducer/userInterface";
import SearchItemBio from "./SearchItemBio";

const SearchItem = (props: { user: IUser }) => {
    const child3Ref = useRef<HTMLElement>(null);
    const child3RefValue = useOnScreen(child3Ref);
    const { user } = props;
    const [bioInfo, setBioInfo] = useState<IUserBio>({} as IUserBio);
    const isMounted = useIsMounted();

    useEffect(() => {
        if (child3RefValue && Object.keys(bioInfo).length === 0 && Object.keys(user).length > 0) {
            fetch('/api/userbio/?user=' + user.login)
                .then(response => response.json())
                .then(
                    (data) => {
                        if (isMounted()) setBioInfo(data)
                    },
                    (error) => {
                        console.log("Err::", error)
                    })
        }
    }, [child3RefValue, bioInfo, user])

    return (
        <article onClick={() => window.open(user.html_url, "_blank")} ref={child3Ref} key={user.id} className="border border-slate-100 rounded-lg flex items-start space-x-6 p-6 hover:bg-gray-50 hover:shadow-md cursor-pointer">
            <img src={user.avatar_url} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
            <div className="min-w-0 relative flex-auto">
                <h2 className="font-semibold text-slate-900 truncate pr-20">{user.login}</h2>
                <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium text-slate-600">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <dt className="text-sky-500">
                            <span className="sr-only">Type</span>
                        </dt>
                        <dd className="px-1.5 ring-1 ring-blue-300 rounded">{user.type}</dd>
                    </div>
                    <SearchItemBio bioInfo={bioInfo} />
                </dl>
            </div>
        </article>
    )
}

export default SearchItem