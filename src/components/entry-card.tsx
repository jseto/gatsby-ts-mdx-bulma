import * as React from 'react'
import { Link, graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import { EntryCardQuery, Mdx } from "../../graphql-types"

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
					item => imagePath.includes( item.fluid.originalName ) 
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
									<Img fluid={ image.fluid } />
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
						fluid( maxWidth: 800 ) {
							originalName
							base64
							aspectRatio
							src
							srcSet
							sizes
						}
					}
				}
			}`
		}
	/>
)
