import * as React from 'react'

export const Columns = ({ children, verticalCenter, align }) => {

	return (
		<div 
			className={ `columns is-multiline ${ verticalCenter && 'is-vcentered' }` }
			style={{ textAlign: align? align : 'left' }}
		>
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