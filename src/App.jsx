import React, { useState } from "react"
import QuestionBox from "./QuestionBox"

// https://opentdb.com/api.php?amount=5   API

function WelcomeScreen({ onStart }) {
	return (
		<body>
			<main className='welcome-screen'>
				<h1>Quizzical</h1>
				<h2>
					Unleash your inner trivia enthusiast <br /> in a thrilling journey
					through knowledge!
				</h2>
				<button onClick={onStart}>Start quiz</button>
			</main>
		</body>
	)
}
function getQA() {
	fetch(
		"https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
	)
		.then(res => res.json())
		.then(data => {
			console.log(data.results[0].question) 
			console.log(data.results[0].correct_answer)
			console.log(data.results[0].incorrect_answers)
		
		})
		.catch(error => {
			console.log("error:", error)
		})
}
getQA()

function QuizScreen() {
	return (
		<body>
			<main className='quiz-screen'>
				<QuestionBox />
				<QuestionBox />
				<QuestionBox />
				<QuestionBox />
				<QuestionBox />
				<button>Check answers</button>
			</main>
		</body>
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
