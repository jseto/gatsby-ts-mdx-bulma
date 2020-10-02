import * as React from 'react'

interface ColumnsProps {
	className?: string;
	verticalCenter?: boolean;
	align?: 'left' | 'right' | 'center';
	columnWidths?: string | string[];
	children: React.ReactNode;
}

export const Columns = ({ 
	className,
	children, 
	verticalCenter, 
	align, 
	columnWidths }: ColumnsProps
) => {
	const colWidths = typeof columnWidths == 'string'
		? new Array(5).fill( columnWidths ) 
		: columnWidths || new Array(5).fill( 'is-half' )

	return (
		<div 
			className={ `columns is-multiline ${ verticalCenter && 'is-vcentered' } ${ className }` }
			style={{ textAlign: align? align : 'left' }}
		>
			{
				React.Children.map( children, ( child, idx ) => (
					<div className={
						`column ${ (colWidths && colWidths[ idx])? colWidths[ idx]:'' }`
					}>
						{ child }
					</div>
				))
			}
		</div>
	)
}