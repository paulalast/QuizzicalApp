import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent, waitFor } from "@testing-library/react"

import App from "./App"
import QuestionBox from "./QuestionBox"

jest.mock("./QuestionBox", () => {
	return jest.fn(() => <div>Mocked QuestionBox</div>)
})

describe("App", () => {
	test("displays questions and handles user answers", async () => {
		// Ustawienie mocka dla komponentu QuestionBox
		QuestionBox.mockImplementation(() => <div>Mocked QuestionBox</div>)

		const { getByText } = render(<App />)

		// Sprawdź czy ekran powitalny jest wyświetlany
		expect(getByText(/quizzical/i)).toBeInTheDocument()

		// Kliknij przycisk "Start quiz"
		fireEvent.click(getByText(/start quiz/i))

		// Poczekaj na załadowanie pytań
		await waitFor(() => {
			expect(QuestionBox).toHaveBeenCalled()
		})
	})
})
