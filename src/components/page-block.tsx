import * as React from 'react'
import { Component } from 'react'
import { MarkdownBlock } from "./markdown-block"
import { MdxFrontmatter, Mdx } from '../../graphql-types'

type Block = Pick<Mdx, "body" | "id"> & {
	frontmatter?: Pick<MdxFrontmatter, "blockName" | "className">;
}

interface PageBlockProps {
	blockCollection: Block[];
	blockName: string;
}

export class PageBlock extends Component< PageBlockProps > {
	render() {
		const { blockCollection, blockName } = this.props
		const block = blockCollection.find( block => block.frontmatter.blockName === blockName )
		
		return (
			<MarkdownBlock className={`block ${ block.frontmatter.className }`}	key={ block.id }>
				{ block.body }
			</MarkdownBlock>
		)
	}
}