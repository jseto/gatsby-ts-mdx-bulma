import * as React from 'react'
import { ReactNode } from 'react'
import { MdxHeadingMdx, Mdx, MdxFrontmatter, MdxFields } from '../../graphql-types'

type EntryGridItem = (Pick<Mdx, "id" | "excerpt"> & {
	frontmatter?: Pick<MdxFrontmatter, "title" | "page" | "description" | "className" | "blockOrder" | "blockName" | "category">;
	fields?: Pick<MdxFields, "slug" | "featuredImage">;
})

export interface EntryGridProps {
	items: EntryGridItem[];
	className?: string;
	compact: boolean;
	children: ( item: EntryGridItem ) => ReactNode;
}

export class EntryGrid extends React.Component<EntryGridProps> {

	render() {
		const { compact, className } = this.props

		return(
			<div className={ `columns is-multiline ${ className }` }>

				{ compact
					? this.renderCompactGrid()
					: this.renderSpareGrid()
				}

			</div>
		)
	}

	private renderSpareGrid() {
		const { items, children } = this.props

		return items.map( item => (
      <div key={ item.id } className="column is-one-third">
				{ children( item ) }
      </div>
    ))
	}

	private renderCompactGrid() {
		const { items, children } = this.props
		const childrenElement = items.map( item => children( item ) )

		return (
		  <>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 0 ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 1 ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 2 ) }
				</div>
		  </>
		)
	}
}


export const findFeaturedImage = ( mdxAST: {} ) => {
	if ( mdxAST['type'] === 'image' ) {
		return mdxAST['url']
	}
	else {
		var result = null
		mdxAST['children']?.forEach( item => {
			if ( !result ) {
				result = findFeaturedImage( item ) 
			}
		})
		return result
	}
}