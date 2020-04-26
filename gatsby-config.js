module.exports = {
  siteMetadata: {
    title: `Site Title`,
    description: `Site description`,
    author: `@my_author`,
    siteUrl: 'https://mysite.netlify.app',
    lang: 'en',
    navbar: {
      logo: {
        file: '/images/gatsby-logo.png',         // should be in static folder
        width: '88px',
        alt: 'Site Logo'
      },
      className: 'navbar-style',
      menuItems: [
        { content: 'Home', href: '/' },
        { content: 'Page 2', href: '/page-2' },
        { content: 'Gatsby', href: 'https://www.gatsbyjs.org/' },
      ]
    },
    lang: 'en'
  },
  plugins: [
		`gatsby-plugin-ts`,
    `gatsby-plugin-react-helmet`,
		'gatsby-plugin-sass',
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
    'gatsby-plugin-catch-links',
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        // defaultLayouts: {
        //   default: require.resolve('./src/pages/page.tsx'),
        // },
        gatsbyRemarkPlugins: [
					'gatsby-remark-numbered-footnotes',
					{
             resolve: `gatsby-remark-autolink-headers`,
             options: {
               icon: false,
							 removeAccents: true
						 }
         	},
	        {
	          resolve: `gatsby-remark-images`,
	          options: {
	            // It's important to specify the maxWidth (in pixels) of
	            // the content container as this plugin uses this as the
	            // base for generating different widths of each image.
	            maxWidth: 2048,
	          },
	        },
					'gatsby-remark-copy-linked-files',
	      ],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts`,
			}
		},
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-000000000-1', // Google Analytics / GA
					'AW-000000000', // Google Ads / Adwords / AW                  cSpell: disable-line
					'G-XX0XXX0XX0',
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)                  cSpell: disable-line
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: false,                  // cSpell: disable-line
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
		`gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
		{
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
				develop: false,
        whitelist: [],
        purgeOnly: ['/style.scss'], // applies purging only on the bulma css file                  cSpell: disable-line
      },
    }, // must be after other CSS plugins
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
