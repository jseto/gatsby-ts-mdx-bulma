import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <MDXProvider
      components={{
        a: props => props.href.indexOf('http') >= 0? <a {...props }/> : <Link to={ props.href } {...props}/>
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </MDXProvider>
  )
}

export default Layout
