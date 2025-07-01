import React from 'react'

const Questioncard = ({data, onAnswer, control, selected, current , total}) => {
    const { question, options, answer } = data;



    const getbuttonstyle = (option) => {
        if (!control) {
            return "bg-indigo-700 hover:bg-indigo-600 hover:scale-[1.01] ";
        }
        if (option === answer) return "bg-green-600 ";
        if (selected && option === selected && option !== answer) return "bg-rose-600 ";
        return "bg-indigo-700 ";
    }
  return (
    <div className='bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xl border border-gray-700'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium text-gray-500'>Question {current + 1} of {total}</h2>
        <span className='text-sm bg-gray-700 px-3 py-2 rounded-full'>
          {selected ? Math.round(((current+1)/ total) * 100) + "%Complete"
          :Math.round((current/ total) * 100) + "%Complete"}
        </span>
      </div>
      <p className='text-xl font-medium mb-6'>{question}</p>
      <div className='grid gap-3'>
        {options.map((option, index) => (
          <button
            className={`${getbuttonstyle(option)} text-left px-4 py-3 cursor-pointer rounded-lg text-white`}
            key={index}
            onClick={() => onAnswer(option)}
            disabled={control}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questioncard