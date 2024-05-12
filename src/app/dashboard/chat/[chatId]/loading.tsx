import Skeleton from "react-loading-skeleton"


const loading = () => {
    return (
        <div className='tw-flex tw-flex-col tw-h-full tw-items-center'>
            <Skeleton className='tw-mb-4' height={40} width={400} />
            <div className='tw-flex-1 tw-max-h-full tw-overflow-y-scroll tw-w-full'>
                <div className='tw-flex tw-flex-col tw-flex-auto tw-h-full tw-p-6'>
                    <div className='tw-flex tw-flex-col tw-flex-auto tw-flex-shrink-0 tw-rounded-2xl tw-bg-gray-50 tw-h-full tw-p-4'>
                        <div className='tw-flex tw-flex-col tw-h-full tw-overflow-x-auto tw-mb-4'>
                            <div className='tw-flex tw-flex-col tw-h-full'>
                                <div className='tw-grid tw-grid-cols-12 tw-gap-y-2'>
                                    <div className='tw-col-start-6 tw-col-end-13 tw-p-3 tw-rounded-lg'>
                                        <div className='tw-flex tw-items-center tw-justify-start tw-flex-row-reverse'>
                                            <div className='tw-relative tw-h-10 tw-w-10'>
                                                <Skeleton width={40} height={40} borderRadius={999} />
                                            </div>
                                            <div className='tw-relative tw-mr-3 tw-text-sm tw-bg-indigo-100 tw-text-black tw-py-2 tw-px-4 tw-border tw-border-gray-100 tw-rounded-xl'>
                                                <Skeleton className='tw-ml-2' width={150} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tw-col-start-6 tw-col-end-13 tw-p-3 tw-rounded-lg'>
                                        <div className='tw-flex tw-items-center tw-justify-start tw-flex-row-reverse'>
                                            <div className='tw-relative tw-h-10 tw-w-10'>
                                                <Skeleton width={40} height={40} borderRadius={999} />
                                            </div>
                                            <div className='tw-relative tw-mr-3 tw-text-sm tw-bg-indigo-100 tw-text-black tw-py-2 tw-px-4 tw-border tw-border-gray-100 tw-rounded-xl'>
                                                <Skeleton className='tw-ml-2' width={150} height={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='tw-col-start-1 tw-col-end-8 tw-p-3 tw-rounded-lg'>
                                        <div className='tw-flex tw-flex-row tw-items-center'>
                                            <div className='tw-relative tw-h-10 tw-w-10'>
                                                <Skeleton width={40} height={40} borderRadius={999} />
                                            </div>
                                            <div className='tw-relative ml-3 tw-text-sm tw-bg-white tw-py-2 tw-px-4 tw-border tw-border-gray-100 tw-rounded-xl'>
                                                <Skeleton className='tw-ml-2' width={150} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tw-col-start-6 tw-col-end-13 tw-p-3 tw-rounded-lg'>
                                        <div className='tw-flex tw-items-center tw-justify-start tw-flex-row-reverse'>
                                            <div className='tw-relative tw-h-10 tw-w-10'>
                                                <Skeleton width={40} height={40} borderRadius={999} />
                                            </div>
                                            <div className='tw-relative tw-mr-3 tw-text-sm tw-bg-indigo-100 tw-text-black tw-py-2 tw-px-4 tw-border tw-border-gray-100 tw-rounded-xl'>
                                                <Skeleton className='tw-ml-2' width={150} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tw-col-start-1 tw-col-end-8 tw-p-3 tw-rounded-lg'>
                                        <div className='tw-flex tw-flex-row tw-items-center'>
                                            <div className='tw-relative tw-h-10 tw-w-10'>
                                                <Skeleton width={40} height={40} borderRadius={999} />
                                            </div>
                                            <div className='tw-relative tw-ml-3 tw-text-sm tw-bg-white tw-py-2 tw-px-4 tw-border tw-border-gray-100 tw-rounded-xl'>
                                                <Skeleton className='tw-ml-2' width={150} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loading