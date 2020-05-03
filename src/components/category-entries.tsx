import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { EntryGrid, EntryGridItem } from '../components/entry-grid';
import { CategoryEntriesQuery } from '../../graphql-types';
import { EntryCard } from '../components/entry-card';

export interface CategoryEntriesProps {
	className?: string;
	category: string;
	readMoreLabel?: string;
	tags: string; // comma separated
	children?: ( item: EntryGridItem ) => React.ReactElement;
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
						tableOfContents
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
									const { children } = props
									
									if ( children ) {
										return(
											children( item )
										)
									}
									else {
										return (
											<EntryCard
												heading={ item.frontmatter.title }
												excerpt={ item.frontmatter.description || item.excerpt }
												imagePath={ item.fields.featuredImage }
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