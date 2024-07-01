import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useReducer } from 'react'

const InterviewCard = ({ interview }) => {
    const router= useRouter();
    const onStart=()=>{
        router.push(`/dashboard/interview/${interview.mockId}/start`)
    }
    const onFeedback=()=>{
        router.push(`/dashboard/interview/${interview.mockId}/feedback`)
    }
    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-500'>{interview?.jobExperience} years of experience</h2>
            <h2 className='text-sm text-gray-400'>Created At: {interview?.createdAt} </h2>
            <div className='flex justify-between my-2 gap-10'>
                    <Button size="sm" variant="outline" onClick={onFeedback} >Feedback</Button>
                
                    <Button size="sm" onClick={onStart}>Start</Button>
                
            </div>
        </div >
    )
}

export default InterviewCard