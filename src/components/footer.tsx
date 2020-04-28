import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SiteFooterQuery } from '../../graphql-types'
import { ShowMenuItems } from './navbar'

import facebookIcon from "../images/social/facebook-square.svg"
import twitterIcon from "../images/social/twitter-square.svg"
import instagramIcon from "../images/social/instagram-square.svg"
import emailIcon from "../images/social/envelope-square.svg"

export const Footer = () => {
  const { site: { siteMetadata: { footer } } } = useStaticQuery(graphql`
    query SiteFooter {
      site {
        siteMetadata {
          footer {
            logo {
              file
              width
              alt
            },
            className
            firstColumnItems {
              content
              href
            }
            secondColumnItems {
              content
              href
            }
            social {
              facebook
              twitter
              instagram
              email
            }
            madeWithLove
          }
        }
      }
    }
  `) as SiteFooterQuery

  return (
    <footer className={`footer ${ footer.className }`}>
      <div className="content logo">
        { footer.logo.file &&
          <img
            src={ footer.logo.file }
            alt={ footer.logo.alt }
            style={{ width: footer.logo.width }}
          />
        }
      </div>
      <div className="content">
          <div className="columns" style={{
            marginLeft: 0, marginRight: 0
          }}>
            <div className="column is-4">
              <section className="menu">
                <ul className="menu-list">
                  <ShowMenuItems items={ footer.firstColumnItems } />
                </ul>
              </section>
            </div>
            <div className="column is-4">
              <section>
                <ul className="menu-list">
                  <ShowMenuItems items={ footer.secondColumnItems } />
                </ul>
              </section>
            </div>
            <div className="column is-4 social">
              { footer.social.facebook &&
                <a title="facebook" href={ footer.social.facebook } target="_blank">
                  <img src={ facebookIcon } width="1em" /> 
                </a>
              }
              { footer.social.twitter &&
                <a title="twitter" href={ footer.social.twitter } target="_blank">
                  <img src={ twitterIcon } width="1em" />
                </a>
              }
              { footer.social.instagram &&
                <a title="instagram" href={ footer.social.instagram } target="_blank">
                  <img src={ instagramIcon } width="1em"/>
                </a>
              }
              { footer.social.email &&
                <a title="instagram" href={ footer.social.email } target="_blank">
                  <img src={ emailIcon } width="1em"/>
                </a>
              }
            </div>
          </div>
          <div className="column made-with-love">
            { footer.madeWithLove &&
              <small>
                { footer.madeWithLove }
              </small>
            }
          </div>
        </div>
    </footer>
  )
}
