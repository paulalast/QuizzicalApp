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
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		getQA().then(data => {
			if (data) {
				setQuestions(data)
			}
		})
	}, [])
	return (
		<div>
			<main className='quiz-screen'>
				{questions.map((questionData, index) => (
					<QuestionBox
						key={index}
						question={questionData.question}
						answers={questionData.answers}
						questionIndex={index}
					/>
				))}

				<button>Check answers</button>
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

/* 
1. Add posibility to check the answers
2. Count the correct answers
3. If 5/5 answers confetti 
4. Third screen - showing the correct and wrong answers - if answ checked is correct green, is wrong change color on red, and color the correct answ
5. show how many answ is correct 2/5
 */
