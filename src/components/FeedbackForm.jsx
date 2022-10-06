import Card from './shared/Card'
import Button from './shared/Button'
import { useState, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
	const defTitle = 'How would you rate our service?'

	const [title, setTitle] = useState(defTitle)
	const [text, setText] = useState('')
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState(null)
	const [rating, setRating] = useState(10)

	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext)

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setTitle('Edit Feedback')
			setBtnDisabled(false)
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		} else {
			setTitle(defTitle)
		}
	}, [feedbackEdit])

	const handleTextChange = (event) => {
		setText(event.target.value)
		if (text === '') {
			setBtnDisabled(true)
			setMessage(null)
		} else if (text !== '' && text.trim().length <= 10) {
			setBtnDisabled(true)
			setMessage('Min 10 characters')
		} else {
			setBtnDisabled(false)
			setMessage(null)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			}
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback)
			} else {
				addFeedback(newFeedback)
			}
			setText('')
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>{title}</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className="input-group">
					<input
						type="text"
						placeholder="Write a review"
						onChange={handleTextChange}
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
