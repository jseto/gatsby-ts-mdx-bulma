import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { EntryGrid } from '../components/entry-grid';
import { MainCategoryEntriesQuery } from '../../graphql-types';
import { EntryCard } from '../components/entry-card';

export const MainCategoryEntries = ( props: any ) => (
	<StaticQuery
		query={graphql`
			query MainCategoryEntries {
				allMdx(sort: {fields: frontmatter___blockOrder, order: DESC}, filter: {frontmatter: {category: {eq: "main"}}}) {
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
						headings {
							value
						}
					}
				}
			}
  	`}
		render={
			( data: MainCategoryEntriesQuery ) => (
				<>
					<EntryGrid
						items={data.allMdx.nodes}
						compact={ true }
						{...props}
					>
						{
							item => (
								<EntryCard
									key={ item.id}
									heading={ item.headings[0].value }
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
	/>
);
