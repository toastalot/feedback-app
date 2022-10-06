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
		const response = await fetch(`${SERVER_URL}/feedback`)
		const jsonData = await response.json()
		setFeedback(jsonData)
		setIsLoading(false)
	}

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}

	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
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
	const updateFeedback = (id, newItem) => {
		setFeedback(
			feedback.map((item) => (item.id === id ? { ...item, ...newItem } : item))
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
