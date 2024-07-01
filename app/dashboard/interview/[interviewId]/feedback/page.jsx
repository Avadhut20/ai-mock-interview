"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const rout = useRouter();
  useEffect(() => {
    GetFeedback()
  }, []);
  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
    if (result.length > 0) {
      const totalRating = result.reduce((acc, item) => acc + item.rating, 0);
      const avgRating = totalRating / result.length;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);
    }
  }
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='text-2xl font-bold'>Here is your interview feedback</h2>
      {feedbackList?.length == 0 ?
        <h2 className='font-bold text-xl'>No interview Feedback found</h2> : <>

          <h2 className='text-primary text-lg my-3'>Your interview Rating:<strong>{averageRating}/10</strong></h2>
          {feedbackList && feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className='p-2 bg-secondary  w-full mt-2 text-left flex justify-between' >{item.question} <ChevronsUpDownIcon /></CollapsibleTrigger>
              <CollapsibleContent>
                <div className='bg-secondary px-2 flex flex-col gap-2'>
                  <h2 >
                    <strong>Rating: </strong>{item.rating}
                  </h2>
                  <h2 >
                    <strong>Your answer: </strong>{item.userAns}
                  </h2>
                  <h2 >
                    <strong>Correct answer: </strong>{item.correctAns}
                  </h2>
                  <h2 >
                    <strong>Feedback: </strong>{item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>

      }


      <Button className="my-2" onClick={() => rout.replace("/dashboard")}>Go Home</Button>

    </div>
  )
}

export default Feedback