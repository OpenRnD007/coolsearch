import { LoadingIcon } from "../utils";

const SearchItemBio = (props: { bioInfo: any }) => {
    const { bioInfo } = props;
    return (
        <>
            {bioInfo && Object.keys(bioInfo).length > 0 ? <>
                <div className="flex-none w-full font-normal">
                    <dt className="sr-only">Bio</dt>
                    <dd className="text-slate-400">{bioInfo.bio ?? ""}</dd>
                </div>
                <div className="mt-1">
                    <dt className="sr-only">Followers</dt>
                    <dd className="px-1.5 ring-1 ring-slate-200 rounded">Followers: {bioInfo.followers ?? 0}</dd>
                </div>
                <div className="ml-2 mt-1">
                    <dt className="sr-only">Following</dt>
                    <dd className="px-1.5 ring-1 ring-slate-200 rounded">Following: {bioInfo.following ?? 0}</dd>
                </div>
                <div className="xl:ml-2 mt-1">
                    <dt className="sr-only">Public Repos</dt>
                    <dd className="px-1.5 ring-1 ring-slate-200 rounded">Repo: {bioInfo.public_repos}</dd>
                </div>

                <div className="ml-2 mt-1">
                    <dt className="sr-only">Location</dt>
                    <dd className="text-slate-500">{bioInfo.location && <div className="flex items-center"><img src="/marker.png" width="20" height="20" /> {bioInfo.location}</div>}</dd>
                </div> </>
                : <LoadingIcon />
            }
        </>
    )
}

export default SearchItemBio;