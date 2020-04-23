import * as React from 'react'
import { Link, graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import { EntryCardQuery } from "../../graphql-types"

interface EntryCardProps {
	key: string;
	heading: string;
	excerpt: string;
	slug: string;
	imagePath: string;
}

export const EntryCard = ({ key, heading, excerpt, slug, imagePath }: EntryCardProps) => (
	<StaticQuery
		render={
			( data: EntryCardQuery ) => {
				const image = data.allFile.nodes.find( item => imagePath.includes( item.relativePath ) )
				return (
					<Link className="no-decorators" key={key} to={ slug }>
						<h2>{ heading }</h2>
						<Img fixed={ image.childImageSharp.fixed } />
						<p>
							{ excerpt }
						</p>
						<Link to={ slug }>Read More...</Link>
					</Link>								
				)
			}
		}
		query={
			graphql`
			query EntryCard {
				allFile {
					nodes {
						relativePath
						childImageSharp {
							fixed(width: 150, height: 150 ) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}`
		}
	/>
)
