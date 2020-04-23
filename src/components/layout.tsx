import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Header from "./header"
import "../styles/style.scss"

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
      <section className="section">
        <div className="container">
          <div className="content">
            {children}
          </div>
        </div>
      </section>
    </MDXProvider>
  )
}

export default Layout