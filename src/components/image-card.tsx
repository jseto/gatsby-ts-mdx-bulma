import * as React from 'react'
import { Columns } from './columns'

interface ImageCardProps {
	className?: string,
	sideBySide?: boolean,
	imageIsLastElement?: boolean,
	children: React.ReactNode
}

export const ImageCard: React.FC<ImageCardProps> = ({ children, className, sideBySide, imageIsLastElement }) => {
	const content = ()=> {
		if ( imageIsLastElement ) { 
			return (
				<>
					<div className="text-container">
						{ children[1] }
						{ children[2] }
					</div>
					<div className="image-container">
						{ children[0] }
					</div>
				</>
			)
		}
		else {
			return (
				<>
					<div className="image-container">
						{ children[0] }
					</div>
					<div className="text-container">
						{ children[1] }
						{ children[2] }
					</div>
				</>
			)
		}
	}

	if ( sideBySide ) { return (
		<div className={ `image-card ${ className }` }>
			<Columns>
				{ content() }
			</Columns>
		</div>
	)}
	else return (
		<div className={ `image-card ${ className }` }>
			{ content() }
		</div>
	)
}

interface ImageCardContainerProps {
	className?: string;
	columnWidths: string | string[];
	children: React.ReactNode;
}

export const ImageCardContainer: React.FC<ImageCardContainerProps> = ({ className, columnWidths, children }) => {
	const elements = React.Children.toArray( children )
	const imageCards = []

	for ( let i = 0; i < elements.length; i+=3 ) {
		imageCards.push(
			<ImageCard>
				{ children[i] }
				{ children[i+1] }
				{ children[i+2] }
			</ImageCard>
		)
	}

	return (
		<Columns 
			className={`image-card-container ${ className }`}
			columnWidths={ columnWidths }
		>
			{ imageCards }
		</Columns>
	)
}