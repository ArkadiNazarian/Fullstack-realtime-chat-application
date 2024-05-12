import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {

    return (
        <div className="tw-w-full tw-flex tw-flex-col">
            <Skeleton className='tw-mb-4' height={60} width={500} />
            <Skeleton height={20} width={150}/>
            <Skeleton height={50} width={400}/>
        </div>
    )
}

export default loading