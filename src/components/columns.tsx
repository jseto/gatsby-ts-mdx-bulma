import * as React from 'react'

export const Columns = ({ children, verticalCenter }) => {

	return (
		<div className={ `columns is-multiline ${ verticalCenter && 'is-vcentered' }` }>
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