"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { db } from '@/utils/db'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { chatSession } from '@/utils/GeminiAiModal'
import { InterviewInsight, UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { toast } from 'sonner'

const RecordAnswer = ({ interviewQuestion, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });



    useEffect(() => {
        results.map((result) => {
            console.log("Interim Result:", result);
            setUserAnswer((prevAns) => prevAns + result?.transcript);
        });
    }, [results]);

    const saveUserAnswer = async () => {
        if (isRecording) {
            setLoading(true)
            console.log("Stopping recording...");
            stopSpeechToText();
            console.log("Final Answer:", userAnswer);
            const feedbackPrompt = "Question:" + interviewQuestion[activeQuestionIndex]?.question + ", User Answer:" + userAnswer + ",Depends on question and user answer" + " please give us a rating for answer and feedback as area of improvement if any " + "in just 3 to 5 lines to improve it in json format with rating field and feedback field";
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            console.log(mockJsonResp);
            const JsonFeedbackResp = JSON.parse(mockJsonResp)
            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData.mockId,
                    question: interviewQuestion[activeQuestionIndex]?.question,
                    correctAns: interviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp.feedback,
                    rating: JsonFeedbackResp.rating,
                    userEmail: user?.primaryEmailAddress.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                });
            if (resp) {
                toast('User answer recorded successfully')
                setResults([]);
            }
            setResults([])
            setLoading(false);
        } else {
            console.log("Starting recording...");
            startSpeechToText();
        }

    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 mt-20 mr-10'>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>
            <Button variant='outline' className="my-10" onClick={saveUserAnswer}>
                {isRecording ? (
                    <h2 className='text-red-600 flex justify-center'><Mic /> Stop Recording</h2>
                ) : (
                    'Record Answer'
                )}
            </Button>
            
        </div>
    )
}

export default RecordAnswer;
