import React from "react"

function QuestionBox({ question, answers, questionIndex }) {
    function normalText(text) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
      }
	return (
		<div className='question-box'>
			<h2>{normalText(question)}</h2>
			<div className='answers-box'>
				{answers.map((answer, index) => (
					<div key={index}>
						<input
							type='radio'
							id={`answer-${questionIndex}-${index}`}
							name={`question-${questionIndex}`}
							value={answer}
						/>
						<label htmlFor={`answer-${questionIndex}-${index}`}>{normalText(answer)}</label>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuestionBox
