"use client"
import { db } from '@/utils/db'
import { InterviewInsight } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Butcherman } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Webcam from 'react-webcam'
import Link from 'next/link'

const Interview = ({ params }) => {
    const [interviewData, setInterviewData] = useState([]);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, [])
    const GetInterviewDetails = async () => {
        const result = await db.select().from(InterviewInsight)
            .where(eq(InterviewInsight.mockId, params.interviewId));
        console.log(result);
        setInterviewData(result[0]);
    }
    return (
        <div className='my-10  flex flex-col items-center justify-center '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className='flex flex-col my-5 gap-3 p-5 rounded-lg border'>
                    <h2 className='text-lg'>
                        <strong>Job Role/Job Position: </strong>{interviewData.jobPosition}
                    </h2>

                    <h2 className='text-lg'>
                        <strong>Job Description: </strong>{interviewData.jobDesc}
                    </h2>
                    <h2 className='text-lg'>
                        <strong>Job Experience: </strong>{interviewData.jobExperience}
                    </h2>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center'><Lightbulb /><strong>Information</strong></h2>
                        <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ? <>
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 400,
                                width: 400
                            }}
                        />
                        <Button onClick={() => setWebCamEnabled(false)}>Disable Web Cam</Button>
                    </> :
                        <>

                            <WebcamIcon className='h-60 w-full my-7 p-10 bg-secondary rounded-lg border ' />
                            <Button onClick={() => setWebCamEnabled(true)} className="w-full">Enable Web cam and microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-center ">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>

                    <Button>Start Interview</Button>
                </Link>
            </div>


        </div>
    )
}

export default Interview