"use client"
import { db } from '@/utils/db';
import { InterviewInsight } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect,useState } from 'react'
import InterviewCard from './InterviewCard';

const InterviewList = () => {
    const {user}= useUser();
    const [interviewList, setInterviewList]=useState([])
    useEffect(()=>{
        user && GetInterviewList()
    },[user])
    const GetInterviewList=async ()=>{
        const result= await db.select()
        .from(InterviewInsight)
        .where(eq(InterviewInsight.createdBy,user.primaryEmailAddress?.emailAddress))
        .orderBy(desc(InterviewInsight.id));
        console.log(result);
        setInterviewList(result);
    }
  return (
    <div >
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid girid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList