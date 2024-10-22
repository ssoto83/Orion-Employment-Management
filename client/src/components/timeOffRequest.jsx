import {useQuery} from '@apollo/client'
import {useMutation} from '@apollo/client';
import {CREATE_TIMEOFFREQUEST} from '../utils/mutations'
import {GET_ME} from '../utils/queries'

const TimeOffRequest = () => {
    const {data} = useQuery(GET_ME)
    const [request] = useMutation(CREATE_TIMEOFFREQUEST)

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const user = data?.me || {}
        

        const startDate = e.target[0].value
        const endDate = e.target[1].value
        try{
            await request({
                variables:{startDate,endDate,employee:user._id}
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <form id="date" onSubmit={handleSubmit}>
            <input type="date" name="startdate" id="startdate" />
            <input type="date" name="enddate" id="enddate" />
            <button type="submit" id='submit-request'>Submit Request</button>
        </form>
        
    )
}

export default TimeOffRequest;