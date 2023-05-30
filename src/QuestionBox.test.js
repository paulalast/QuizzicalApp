import React from "react"
import { render, fireEvent } from "@testing-library/react"
import QuestionBox from "./QuestionBox"
import "@testing-library/jest-dom/extend-expect"

describe("QuestionBox", () => {
	const question = "What is the capital of France?"
	const answers = ["London", "Paris", "Berlin", "Madrid"]
	const correctAnswer = "Paris"
	const questionId = "1"
	const handleAnswerSelected = jest.fn()

	test("renders question and answers correctly", () => {
		const { getByText } = render(
			<QuestionBox
				question={question}
				answers={answers}
				correctAnswer={correctAnswer}
				questionId={questionId}
				handleAnswerSelected={handleAnswerSelected}
				checkAnswers={false}
			/>
		)

		// Sprawdź, czy pytanie jest wyrenderowane
		expect(getByText(question)).toBeInTheDocument()

		// Sprawdź, czy odpowiedzi są wyrenderowane
		answers.forEach(answer => {
			expect(getByText(answer)).toBeInTheDocument()
		})
	})

	test("calls handleAnswerSelected when an answer is selected", () => {
		const handleAnswerSelected = jest.fn()
		const { getByLabelText } = render(
			<QuestionBox
				question={question}
				answers={answers}
				correctAnswer={correctAnswer}
				questionId={questionId}
				handleAnswerSelected={handleAnswerSelected}
				checkAnswers={false}
			/>
		)

		// Wywołaj funkcję handleAnswerSelected z odpowiednimi argumentami
		handleAnswerSelected(questionId, answers[1])

		// Sprawdź, czy funkcja handleAnswerSelected została wywołana z odpowiednimi argumentami
		expect(handleAnswerSelected).toHaveBeenCalledTimes(1)
		expect(handleAnswerSelected).toHaveBeenCalledWith(questionId, answers[1])
	})
})
