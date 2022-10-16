import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SERVER_URL } from '../env'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchFeedback()
	}, [])

	const fetchFeedback = async () => {
		const response = await fetch(`${SERVER_URL}/feedback?_sort=id&_order=desc`)
		const jsonData = await response.json()
		setFeedback(jsonData)
		setIsLoading(false)
	}

	const addFeedback = async (newFeedback) => {
		const response = await fetch(`${SERVER_URL}/feedback`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})
		const data = await response.json()

		setFeedback([data, ...feedback])
	}

	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`${SERVER_URL}/feedback/${id}`, { method: 'DELETE' })
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	// set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	// update item
	const updateFeedback = async (id, updItem) => {
		const response = await fetch(`${SERVER_URL}/feedback/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updItem),
		})
		setFeedback(
			feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
		)
		setFeedbackEdit({
			item: {},
			edit: false,
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				addFeedback,
				deleteFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
