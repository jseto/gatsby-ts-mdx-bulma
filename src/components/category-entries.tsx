import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { EntryGrid } from '../components/entry-grid';
import { CategoryEntriesQuery } from '../../graphql-types';
import { EntryCard } from '../components/entry-card';

interface CategoryEntriesProps {
	className?: string;
	category: string;
}

export const CategoryEntries = ( props: CategoryEntriesProps ) => (
	<StaticQuery
		query={graphql`
			query CategoryEntries {
				allMdx(sort: {fields: frontmatter___blockOrder, order: DESC}) {
					nodes {
						frontmatter {
							title
							page
							description
							className
							blockOrder
							blockName
							category
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
				const nodes = data.allMdx.nodes.filter( node => node.frontmatter.category === props.category )
				return (
					<>
						<EntryGrid
							items={ nodes }
							compact={ true }
							{...props}
						>
							{
								item => (
									<EntryCard
										key={ item.id}
										heading={ item.frontmatter.title }
										excerpt={ item.excerpt }
										imagePath={ item.fields.featuredImage }
										slug={ item.fields.slug }
									/>
								)
							}

						</EntryGrid>
					</>
				)
			}
		}
	/>
);
