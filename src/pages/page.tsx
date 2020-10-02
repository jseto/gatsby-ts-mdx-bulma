import * as React from "react"
import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { MarkdownBlock } from "../components/markdown-block"
import { MDXProvider } from "@mdx-js/react"
import { CategoryEntries } from "../components/category-entries"
import { ImportMarkdown } from "../components/import-markdown"
import { Columns } from "../components/columns"
import { Testimonial } from '../components/testimonial'
import { ImageCard, ImageCardContainer } from '../components/image-card'

interface PageProps {
  data: {
    mdx: {
      id: string;
      body: string;
      excerpt: string;
      fields: {
        featuredImage: string
      }
      frontmatter: {
        title: string;
        description: string;
        className: string;
        featuredImage: {
          publicURL: string
        }
      }
    }
    allFile: {
      nodes: [{
        publicURL: string
      }]
    }
  }
}

class Page extends React.Component<PageProps> {

  render() {
    const { data: { mdx, allFile } } = this.props
    const featuredImageFile = () => allFile.nodes.find( 
      file => file.publicURL.includes( mdx.fields.featuredImage )
    )
    const featuredImage = mdx.frontmatter.featuredImage?.publicURL || featuredImageFile()?.publicURL

    return(
      <Layout>
        <SEO 
          title={ mdx.frontmatter.title } 
          description={ mdx.frontmatter.description || mdx.excerpt }
          featuredImage={ featuredImage }
        />

          <MDXProvider
            components={{
              CategoryEntries, ImportMarkdown, Columns, Testimonial,
              ImageCard, ImageCardContainer
            }}
          >

          <MarkdownBlock 
            className={ mdx.frontmatter.className } 
            frontmatter={ mdx.frontmatter as any }  // Use from MDX file as {props.frontmatter}
            featuredImage={ featuredImage }
          >
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
    fields {
      featuredImage 
    }
    frontmatter {
			title
      description
      className
      featuredImage {
        publicURL
      }
    }
  }
  allFile(filter: {internal: {mediaType: {glob: "image/*"}}}) {
    nodes {
      publicURL
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
// hr
// svg
