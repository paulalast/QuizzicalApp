import React, { useState, useEffect } from "react"
function QuestionBox({
	question,
	answers,
	correctAnswer,
	questionId,
	handleAnswerSelected,
	checkAnswers,
}) {
	const [selectedAnswer, setSelectedAnswer] = useState(null)

	const handleAnswer = event => {
		setSelectedAnswer(event.target.value)
	}
	const normalText = text => {
		const textArea = document.createElement("textarea")
		textArea.innerHTML = text
		return textArea.value
	}
useEffect(() => {
		if (checkAnswers) {
			handleAnswerSelected(questionId, selectedAnswer)
			answers.forEach((answer, index) => {
				if (answer !== selectedAnswer) {
					const labelElement = document.querySelector(
						`label[for="answer-${questionId}-${index}"]`
					)
					labelElement.classList.add("fade")
				}
			})
		}
	}, [checkAnswers])
	return (
		<div className='question-box'>
			<h2 className='question'>{normalText(question)}</h2>
			<div className='answers-box'>
				{answers.map((answer, index) => (
					<div key={`${questionId}-${index}`}>
						<input
							type='radio'
							id={`answer-${questionId}-${index}`}
							name={question}
							value={answer}
							checked={selectedAnswer === answer}
							onChange={handleAnswer}
							disabled={checkAnswers}
						/>
						<label
							htmlFor={`answer-${questionId}-${index}`}
							className={
								checkAnswers
									? selectedAnswer === null
										? answer === correctAnswer
											? "correct"
											: ""
										: selectedAnswer === answer
										? answer === correctAnswer
											? "correct"
											: "incorrect"
										: answer === correctAnswer
										? "correct"
										: ""
									: ""
							}
						>
							{normalText(answer)}
						</label>
					</div>
				))}
			</div>
		</div>
	)
}
export default QuestionBox
