
/**
 * Simple Loading Icon
 * @returns ReactComponent
 */
export const LoadingIcon = () => {
    return (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

/**
 * Generate Loading animation with label
 * @param props { label: string }
 * @returns ReactComponent
 */
export const LoadingIconWithLabel = (props: { label: string }) => {
    return (
        <div className="flex items-center justify-center mb-5">
            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-sky-500 transition ease-in-out duration-150 cursor-not-allowed" disabled={true}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {props.label}
            </button>
        </div>
    )
}

/**
 * Generate loading skeleton
 * @param props {count: number} 
 * @returns ReactComponent
 */
export const LoadingSkeleton = (props: { count: number }) => {
    return (
        <>
            {props.count > 0 && [...Array(props.count)].map((ele: any, inx: number) =>
                <div key={inx} className="h-32 w-full border border-slate-100 rounded-lg flex items-start space-x-6 p-6 hover:bg-gray-50 hover:shadow-md">
                    <div className="animate-pulse flex space-x-4 w-full">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1 w-full">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}