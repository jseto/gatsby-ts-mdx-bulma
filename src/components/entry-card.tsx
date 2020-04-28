import * as React from 'react'
import { Link, graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import { EntryCardQuery } from "../../graphql-types"

interface EntryCardProps {
	heading: string;
	excerpt: string;
	slug: string;
	imagePath: string;
}

export const EntryCard = ({ heading, excerpt, slug, imagePath }: EntryCardProps) => (
	<StaticQuery
		render={
			( data: EntryCardQuery ) => {
				const image = data.allImageSharp.nodes.find( item => imagePath.includes( item.fixed.originalName ) )
				return (
					<div className="entry-card">
						<Link className="no-decorators" to={ slug }>
							<h2>{ heading }</h2>
							<div className="image-container">
								{ image &&
									<Img fixed={ image.fixed } />
								}
							</div>
							<p>
								{ excerpt }
							</p>
						</Link>
						<Link className="read-more" to={ slug }>Leer más...</Link>
					</div>
				)
			}
		}
		query={
			graphql`
			query EntryCard {
				allImageSharp {
					nodes {
						fixed(width: 150, height: 150 ) {
							originalName
							...GatsbyImageSharpFixed
						}
					}
				}
			}`
		}
	/>
)
