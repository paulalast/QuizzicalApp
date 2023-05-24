import React, { useEffect, useState } from "react"
import QuestionBox from "./QuestionBox"
import { v4 as uuidv4 } from "uuid"
import Confetti from "react-confetti"
const APILink = "https://opentdb.com/api.php?amount=5&type=multiple"
const WelcomeScreen = ({ onStart }) => (
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
const getQA = async () => {
	try {
		const res = await fetch(APILink)
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
				id: uuidv4(),
			}
		})
	} catch (error) {
		console.log("error:", error)
		return alert("Oh no")
	}
}
const QuizScreen = ({ onPlayAgain }) => {
	const [questions, setQuestions] = useState([])
	const [correctAnswers, setCorrectAnswers] = useState([])
	const [userAnswers, setUserAnswers] = useState([])
	const [summary, setSummary] = useState("")
	const [checkAnswers, setCheckAnswers] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)
	useEffect(() => {
		getQA().then(data => {
			if (data) {
				setQuestions(data)
				setCorrectAnswers(data.map(questionData => questionData.correctAnswer))
				setUserAnswers(new Array(data.length).fill(null))
			}
		})
	}, [])
	useEffect(() => {
		if (
			checkAnswers &&
			userAnswers.every((answer, index) => answer === correctAnswers[index])
		) {
			setShowConfetti(true)
		}
	}, [checkAnswers, correctAnswers, userAnswers])
	useEffect(() => {
		if (checkAnswers) {
			let correctAnswersCount = 0
			for (let i = 0; i < correctAnswers.length; i++) {
				if (correctAnswers[i] === userAnswers[i]) {
					correctAnswersCount++
				}
			}
			setSummary(
				`You scored ${correctAnswersCount}/${questions.length} correct answers!`
			)
		}
	}, [userAnswers, correctAnswers, checkAnswers, questions.length])
	const handleClick = () => setCheckAnswers(true)
	const handleAnswerSelected = (questionId, answer) => {
		setUserAnswers(prevAnswers => {
			const newAnswers = [...prevAnswers]
			const index = questions.findIndex(question => question.id === questionId)
			newAnswers[index] = answer
			return newAnswers
		})
	}
	const playAgain = () => {
		setQuestions([])
		setCorrectAnswers([])
		setUserAnswers([])
		setSummary("")
		setCheckAnswers(false)
		onPlayAgain()
	}
	return (
		<div>
			<main className='quiz-screen'>
				{questions.map(questionData => (
					<QuestionBox
						key={questionData.id}
						question={questionData.question}
						answers={questionData.answers}
						correctAnswer={questionData.correctAnswer}
						questionId={questionData.id}
						handleAnswerSelected={handleAnswerSelected}
						checkAnswers={checkAnswers}
					/>
				))}
				{!checkAnswers && (
					<button className='btn' onClick={handleClick}>
						Check answers
					</button>
				)}
				<p>{summary}</p>
				{checkAnswers && (
					<button className='btn' onClick={playAgain}>
						Play again
					</button>
				)}
			</main>
			{showConfetti && <Confetti />}
		</div>
	)
}
const App = () => {
	const [quizStarted, setQuizStarted] = useState(false)
	const handlePlayAgain = () => setQuizStarted(false)
	return (
		<div className='app'>
			{quizStarted ? (
				<QuizScreen onPlayAgain={handlePlayAgain} />
			) : (
				<WelcomeScreen onStart={() => setQuizStarted(true)} />
			)}
		</div>
	)
}
export default App
