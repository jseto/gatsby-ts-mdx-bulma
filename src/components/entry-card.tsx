import * as React from 'react'
import { Link, graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import { EntryCardQuery } from "../../graphql-types"

interface EntryCardProps {
	heading: string;
	excerpt: string;
	slug: string;
	imagePath: string;
	readMoreLabel: string;
}

export const EntryCard = ({ heading, excerpt, slug, imagePath, readMoreLabel }: EntryCardProps) => (
	<StaticQuery
		render={
			( data: EntryCardQuery ) => {
				const image = data.allImageSharp.nodes.find( item => imagePath.includes( item.fluid.originalName ) )
				return (
					<div className="entry-card">
						<Link className="no-decorators" to={ slug }>
							<h2>{ heading }</h2>
							<div className="image-container">
								{ image &&
									<Img fluid={ image.fluid } />
								}
							</div>
							<p>
								{ excerpt }
							</p>
						</Link>
						<Link className="read-more" to={ slug }>
							{ readMoreLabel || 'Read More→' }
						</Link>
					</div>
				)
			}
		}
		query={
			graphql`
			query EntryCard {
				allImageSharp {
					nodes {
						fluid( maxWidth: 800 ) {
							originalName
							...GatsbyImageSharpFluid
						}
					}
				}
			}`
		}
	/>
)
