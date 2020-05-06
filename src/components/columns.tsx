import * as React from 'react'

export const Columns = ({ children }) => {

	return (
		<div className="columns is-multiline">
			{
				React.Children.map( children, child => (
					<div className="column">
						{ child }
					</div>
				))
			}
		</div>
	)
}