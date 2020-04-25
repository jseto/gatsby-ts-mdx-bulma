import * as React from 'react'
import { ReactNode } from 'react'
import { Mdx, MdxFrontmatter, MdxFields } from '../../graphql-types'

type EntryGridItem = (Pick<Mdx, "id" | "excerpt"> & {
	frontmatter?: Pick<MdxFrontmatter, "title" | "page" | "description" | "className" | "order" | "blockName" | "category">;
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
		const childrenElement = items.map( item => ({ id: item.id, elem: children( item ) }) )

		return (
		  <>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 0 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 1 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 2 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
		  </>
		)
	}
}
