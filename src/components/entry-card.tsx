import * as React from 'react'
import { Link, graphql, StaticQuery } from "gatsby"
import { EntryCardQuery, Mdx } from "../../graphql-types"
import { GatsbyImage } from 'gatsby-plugin-image'

export interface EntryCardProps {
	heading: string | JSX.Element;
	excerpt: string | JSX.Element;
	slug: string;
	imagePath: string;
	readMoreLabel?: string | JSX.Element;
	node?: Mdx;
}

export const EntryCard = ({ heading, excerpt, slug, imagePath, readMoreLabel }: EntryCardProps) => (
	<StaticQuery
		render={
			( data: EntryCardQuery ) => {
				
				const image = imagePath && data.allImageSharp.nodes.find( 
					item => item.original.src.includes( imagePath.slice(0, imagePath.lastIndexOf('.')) ) 
				)

				return (
					<div className="entry-card">
						<h2>
							{ typeof heading === 'string'
									? <Link className="no-decorators" to={ slug }>{ heading }</Link>
									: heading 
							}
						</h2>
						<Link className="no-decorators" to={ slug }>
							<div className="image-container">
								{ image &&
									<GatsbyImage image={ image.gatsbyImageData } alt={''}/>
								}
							</div>
						</Link>
						{ typeof excerpt === 'string'
								? <Link className="no-decorators" to={ slug }><p>{ excerpt }</p></Link>
								: excerpt
						}
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
						gatsbyImageData
						original {
							src
						}
					}
				}
			}`
		}
	/>
)
