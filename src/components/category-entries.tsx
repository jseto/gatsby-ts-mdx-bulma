import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { EntryGrid } from '../components/entry-grid';
import { CategoryEntriesQuery } from '../../graphql-types';
import { EntryCard } from '../components/entry-card';

interface CategoryEntriesProps {
	className?: string;
	category: string;
	readMoreLabel?: string;
	tags: string; // comma separated
	noImage: boolean;
	children?: React.ReactElement;
}

export const CategoryEntries = ( props: CategoryEntriesProps ) => (
	<StaticQuery
		query={graphql`
			query CategoryEntries {
				allMdx(sort: {fields: frontmatter___order, order: DESC}) {
					nodes {
						frontmatter {
							title
							description
							className
							order
							category
							tags
						}
						id
						excerpt
						fields {
							slug
							featuredImage
						}
					}
				}
			}
  	`}
		render={
			( data: CategoryEntriesQuery ) => {
				
				const nodes = data.allMdx.nodes.filter( node => 
					node.frontmatter.category === props.category 
								&& hasTags( node.frontmatter.tags, props.tags )
				)

				return (
					<>
						<EntryGrid
							items={ nodes }
							compact={ true }
							{...props}
							>
							{
								item => {
									const { children, noImage } = props
									
									if ( children ) {
										return React.cloneElement( children, { 
											heading: item.frontmatter.title,
											excerpt: item.frontmatter.description || item.excerpt,
											imagePath: item.fields.featuredImage,
											slug: item.fields.slug,
											node: item
										})
									}
									else {
										return (
											<EntryCard
												heading={ item.frontmatter.title }
												excerpt={ item.frontmatter.description || item.excerpt }
												imagePath={ !noImage && item.fields.featuredImage }
												slug={ item.fields.slug }
												readMoreLabel={ props.readMoreLabel }
											/>
										)
									}
								}
							}

						</EntryGrid>
					</>
				)
			}
		}
	/>
);

function hasTags( tags: string[], targetTags: string | string[] ) {
	if ( !targetTags ) return true;
	return tags.filter( tag => targetTags.includes( tag ) ).length
}