"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

import { Input } from '@/components/ui/input'
import { ChatSession } from '@google/generative-ai'
import { chatSession } from '@/utils/GeminiAiModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { InterviewInsight } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router= useRouter();
    const {user}=useUser();
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience)
        const InputPrompt = "Job Postion: " + jobPosition + "Job Description: " + jobDesc + " JobExpereince: " + jobExperience + " Depends on above information Give me the 10 technical interview questions and answers in json format do not include any symbols in json format"
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        
        setJsonResponse(MockJsonResp)
        if(MockJsonResp){

            const resp= await db.insert(InterviewInsight).values({
                mockId:uuidv4(),
                jsonMockresp:MockJsonResp,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                createdBy:user.primaryEmailAddress.emailAddress,
                createdAt:moment().format('DD-MM-yyyy')
    
            }).returning({mockId:InterviewInsight.mockId})
            console.log("Inseted id" , resp)
            if(resp){
                setOpenDialog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId);
            }
        }
        else{
            console.log('Error')
        }
        setLoading(false);
    }
    return (
        <div>
            <div className='p-8 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all ' onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <div>
                                <h2></h2>
                                <h2>Add details about your job position</h2>
                                <form onSubmit={onSubmit} action="">

                                    <div className='mt-4 my-5'>
                                        <label className='text-black'>Job Role/ Job Position</label>
                                        <Input className="mt-2" placeholder="Eg. Full stack developer" required onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>
                                    <div className='mt-4 my-5'>
                                        <label className='text-black'>Job Description/ Job Tech Stack</label>
                                        <Textarea className="mt-2" placeholder="Eg. React, Next js etc." required onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>
                                    <div className='mt-4 my-5'>
                                        <label className='text-black'>Years of Experience</label>
                                        <Input type="number" className="mt-2" min="0" placeholder="Eg. 5" max="40" required onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>
                                    <div className='flex gap-5 justify-end'>
                                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ?
                                                <>
                                                    <LoaderCircle className='animate-spin' />'Generating questions'
                                                </> : 'Start Interview'}
                                        </Button>

                                    </div>
                                </form>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview