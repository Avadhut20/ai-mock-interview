"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { Button } from '@/components/ui/button'
import { InterviewInsight } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Question from './_components/Question'
import RecordAnswer from './_components/RecordAnswer'
import Link from 'next/link'
const startInterview = ({params}) => {
    const [interviewData,setInterviewData]=useState();
    const [interviewQuestion,setInterviewQuestion]=useState([])
    const [activeQuestionIndex,setActiveIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails()
    },[])
    const GetInterviewDetails = async () => {
        const result = await db.select().from(InterviewInsight)
            .where(eq(InterviewInsight.mockId, params.interviewId));
        console.log(result);
        const resp=JSON.parse(result[0].jsonMockresp);
       console.log(resp)
       setInterviewQuestion(resp);
       setInterviewData(result[0]);
    }
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Question
            activeQuestionIndex={activeQuestionIndex}
            interviewQuestion={interviewQuestion}
            setActiveIndex={setActiveIndex} />

            <RecordAnswer
             activeQuestionIndex={activeQuestionIndex}
             interviewQuestion={interviewQuestion}
             interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6 mt-6'>
        { activeQuestionIndex >0 && 
        <Button onClick={()=>setActiveIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {   activeQuestionIndex<9 && 
        <Button onClick={()=>setActiveIndex(activeQuestionIndex+1)}>Next Question</Button>}
           {activeQuestionIndex==9 && 
           <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
           <Button>End Interview</Button>
           </Link>}
        </div>
    </div>
  )
}

export default startInterview