import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import "../styles/style.scss"
import CookieConsent from 'react-cookie-consent'
import { CategoryEntries } from "./category-entries"
import { ImportMarkdown } from "./import-markdown"
import Navbar from "./navbar"
import Footer from "./footer"

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
        CategoryEntries, ImportMarkdown
      }}
    >
      <Navbar/>
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

      <Footer />
    </MDXProvider>
  )
}

export default Layout
