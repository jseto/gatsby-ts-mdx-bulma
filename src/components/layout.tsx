import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Header from "./header"
import "../styles/style.scss"
import CookieConsent from 'react-cookie-consent'
import { CategoryEntries } from "./category-entries"

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
        CategoryEntries
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
      <CookieConsent 
        acceptOnScroll={true}
      >
        We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.
      </CookieConsent>
    </MDXProvider>
  )
}

export default Layout
