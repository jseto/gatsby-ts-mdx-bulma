import * as React from 'react'

export const Testimonial: React.FC = ({ children }) => {
	return (
		<div className="testimonial">
			<div className="image-container">
				{ children[0] }
			</div>
			<div className="opinion-container">
				<div className="opinion-text">
					{ children[1] }
				</div>
				<div className="signature">
					{ children[2] }
					{ children[3] }
				</div>
			</div>
		</div>
	)
}