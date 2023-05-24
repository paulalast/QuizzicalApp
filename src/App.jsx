import React, { useEffect, useState } from "react"
import QuestionBox from "./QuestionBox"

function WelcomeScreen({ onStart }) {
	return (
		<div>
			<main className='welcome-screen'>
				<h1>Quizzical</h1>
				<h2>
					Unleash your inner trivia enthusiast <br /> in a thrilling journey
					through knowledge!
				</h2>
				<button onClick={onStart}>Start quiz</button>
			</main>
		</div>
	)
}
async function getQA() {
	try {
		const res = await fetch(
			"https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
		)
		const data = await res.json()

		return data.results.map(result => {
			const answers = [result.correct_answer, ...result.incorrect_answers]
			for (let i = answers.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[answers[i], answers[j]] = [answers[j], answers[i]]
			}
			return {
				question: result.question,
				answers: answers,
				correctAnswer: result.correct_answer,
			}
		})
	} catch (error) {
		console.log("error:", error)
		return null
	}
}

function QuizScreen() {
	const [questions, setQuestions] = useState([]) // arr with all Q, A and correct answ
	const [correctAnswers, setCorrectAnswers] = useState([]) // arr with all the correct answs
	const [userAnswers, setUserAnswers] = useState([])
	const [summary, setSummary] = useState("")

	useEffect(() => {
		getQA().then(data => {
			if (data) {
				const correctAnswers = data.map(
					questionData => questionData.correctAnswer
				)
				setQuestions(data)
				setCorrectAnswers(correctAnswers)
			}
		})
	}, [])
	function handleClick() {
		let correctAnswersCount = 0
		for (let i = 0; i < correctAnswers.length; i++) {
			if (correctAnswers[i] === userAnswers[i]) {
				correctAnswersCount++
			}
		}

		const summaryText = `You scored ${correctAnswersCount}/${correctAnswers.length} correct answers!`
		setSummary(summaryText)
		
	}
	function handleAnswerSelected(questionIndex, answer) {
		setUserAnswers(prevAnswers => {
			const newAnswers = [...prevAnswers]
			newAnswers[questionIndex] = answer
			return newAnswers
		})
	}
	return (
		<div>
			<main className='quiz-screen'>
				{questions.map((questionData, index) => (
					<QuestionBox
						key={index}
						question={questionData.question}
						answers={questionData.answers}
						questionIndex={index}
						handleAnswerSelected={handleAnswerSelected}
					/>
				))}

				<button onClick={handleClick}>Check answers</button>
				<p>{summary}</p>
			</main>
		</div>
	)
}

function App() {
	const [quizStarted, setQuizStarted] = useState(false)

	return (
		<div>
			{quizStarted ? (
				<QuizScreen />
			) : (
				<WelcomeScreen onStart={() => setQuizStarted(true)} />
			)}
		</div>
	)
}

export default App
