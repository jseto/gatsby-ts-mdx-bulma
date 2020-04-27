import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ImportMarkdownQuery } from '../../graphql-types';
import { MarkdownBlock } from './markdown-block';

export const ImportMarkdown = ({ className, slug })=> {

	const files: ImportMarkdownQuery = useStaticQuery(graphql`
		query ImportMarkdown {
			allMdx {
				nodes {
					body
					fields {
						slug
					}
				}
			}
		}
	`)

	const md = files.allMdx.nodes.find( item => item.fields.slug.includes( slug ) )

	return (
		<MarkdownBlock className={ className || slug }>
			{ md.body }
		</MarkdownBlock>
	)
}