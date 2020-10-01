import * as React from 'react'

interface ColumnsProps {
	className: string;
	verticalCenter?: boolean;
	align?: 'left' | 'right' | 'center';
	colSizes?: string[];
	children: React.ReactChildren;
}

export const Columns = ({ 
	className,
	children, 
	verticalCenter, 
	align, 
	colSizes }: ColumnsProps
) => {

	return (
		<div 
			className={ `columns is-multiline ${ verticalCenter && 'is-vcentered' } ${ className }` }
			style={{ textAlign: align? align : 'left' }}
		>
			{
				React.Children.map( children, ( child, idx ) => (
					<div className={
						`column ${ (colSizes && colSizes[ idx])? colSizes[ idx]:'' }`
					}>
						{ child }
					</div>
				))
			}
		</div>
	)
}