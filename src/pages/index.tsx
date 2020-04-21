import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { PageBlock } from "../components/page-block"
import { IndexQuery } from "../../graphql-types"

interface IndexPageProps {
  data: IndexQuery;
}

const IndexPage = (props: IndexPageProps ) => {
  const { title, description } = props.data.mdx.frontmatter;
	const blocks = props.data.allMdx.nodes;

  return (
    <Layout>
	    <SEO title={ title } description={ description } />

      <PageBlock blockCollection={ blocks } blockName="main" />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query Index {
  mdx(frontmatter: {page: {eq: "index"}, blockName: {eq: "main"}}) {
    frontmatter {
			title
			description
    }
  }
	allMdx(filter: {frontmatter: {page: {eq: "index"}}}, sort: {order: ASC, fields: frontmatter___blockOrder}) {
    nodes {
      body
      id
			frontmatter {
				blockName
				className
			}
    }
  }
}
`
