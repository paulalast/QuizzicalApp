import React, { useState } from "react"

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

function QuizScreen() {
	return (
		<body>
			<main className='quiz-screen'>
				<h1>Quiz Screen</h1>
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
