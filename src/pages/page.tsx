import * as React from "react"

import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { MarkdownBlock } from "../components/markdown-block"
import { PageQuery } from "../../graphql-types"
import { MDXProvider } from "@mdx-js/react"
import { CategoryEntries } from "../components/category-entries"
import { ImportMarkdown } from "../components/import-markdown"
import { Columns } from "../components/columns"

interface PageProps {
  data: PageQuery
}

class Page extends React.Component<PageProps> {

  render() {
    const { data: { mdx } } = this.props

    return(
      <Layout>
        <SEO 
          title={ mdx.frontmatter.title } 
          description={ mdx.frontmatter.description || mdx.excerpt }
        />

          <MDXProvider
            components={{
              CategoryEntries, ImportMarkdown, Columns
            }}
          >

          <MarkdownBlock className={ mdx.frontmatter.className }>
            { mdx.body }
          </MarkdownBlock>

          </MDXProvider>

      </Layout>
    )
  }
}

export default Page

export const query = graphql`
query Page( $id: String ) {
  mdx(id: { eq: $id }) {
    id
    body
    excerpt
    frontmatter {
			title
      description
      className
    }
  }
}
`

// do not remove the following comments. It is to avoid css purgin see: https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/#2-use-a-javascript-comment
// h3
// h4
// h5
// blockquote
// pre
// code
