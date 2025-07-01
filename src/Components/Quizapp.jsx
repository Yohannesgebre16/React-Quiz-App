import React, { useState } from 'react'
import Conffeti from "react-confetti"
import Questioncard from './Questioncard'
import { questions } from './questions'

function Quizapp() {
    const[currentQuestion, setCurrentQuestion] = useState(0)
    const[selectedAnswer, setSelectedAnswer] = useState(null)
    const[score,setScore] = useState(0)
    const[isFinished,setIsFinshed] = useState(false)
    const[control, setControl] = useState(false)


    const handleAnswer = (option)=>{
          if(control) return;
          setSelectedAnswer(option)
          setControl(true)
          if(option === questions[currentQuestion].answer){
            setScore(score +1)
          }
    }
    const goToNext = ()=>{
        if(currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setControl(false)
        }else{
            setIsFinshed(true)
        }

    }
    const restartquiz = ()=>{
      setCurrentQuestion(0)
      setScore(0)
      setSelectedAnswer(null)
      setControl(false)
      setIsFinshed(false)
    }
    const calculateprogress = ()=>{
      if(isFinished) return 100;
      const baseprogress = (currentQuestion/ questions.length) * 100;
      const questionprogress = selectedAnswer ? (1/questions.length) * 100 : 0;
      return baseprogress + questionprogress;
    }
    const percentage = (score/questions.length) * 100;
    const showConfetti = isFinished && percentage > 50 ; 
  return (
    <div className='min-h-screen bg-gray-900 text-white px-1 sm:px-4 flex items-center justify-center flex-col'>
      {showConfetti && <Conffeti/>}
     <div className='text-center mb-6 w-full'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-2 sm:mb-3 break-words'>React soccer quiz app</h1>
        <p className='text-gray-400 text-xs sm:text-base'>Test your football knowledge</p>
      </div>
      <div className='w-full max-w-[95vw] sm:max-w-xs md:max-w-md lg:max-w-xl mb-4 sm:mb-6 overflow-hidden'>
        <div className='h-2 sm:h-3 bg-gray-700 rounded-full'>
          <div className='h-full bg-gradient-to-r from-indigo-500 to-purple-500 duration-500 ease-out transition-all' style={{width : `${calculateprogress()}%`}}>
          </div>
        </div>
      </div>
     
  {!isFinished ?(
    <>
    
       <Questioncard control={control} onAnswer={handleAnswer} 
     
     data={questions[currentQuestion]}
     current={currentQuestion}
     total={questions.length}
     selected={selectedAnswer}
     />
     <div className='mt-4 min-h-[48px] w-full flex justify-center'>
        {control && (
            <button className='bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 
            rounded-lg shadow-2xl font-medium cursor-pointer ' onClick={goToNext}>
                {currentQuestion+1 < questions.length ? "Continue" : "Seeresults"}
            </button>
        )}
     </div>
    
    
    </>
  ) : (
    <div className='text-center px-1 sm:px-0'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>Quiz is completed!</h1>
      <p className='text-lg sm:text-2xl mb-3 sm:mb-4'>You scored <span>{score} </span>
      out of <span className='font-bold'>{questions.length}</span> and it is {Math.round((score/ questions.length) * 100)} %
      </p>
      <div className='my-6 flex justify-center'>
        <span className='animate-bounce bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white px-3 sm:px-8 py-2 sm:py-4 rounded-2xl shadow-lg text-base sm:text-3xl font-extrabold tracking-widest border-4 border-white'>
          Made by <span className='text-black drop-shadow-lg'>Yohannes Gebre</span>
        </span>
      </div>
      <button className='bg-gradient-to-r from-indigo-600 to-purple-600 py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-2xl font-medium cursor-pointer' onClick={restartquiz}>Restart Quiz</button>
    </div>
  ) }
    </div>
  )
}

export default Quizapp