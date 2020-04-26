import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { SiteMenuQuery } from '../../graphql-types';

const navbarEndIcon = '';
const navbarEndIconAlt = '';
const navbarEndIconUrl = '';

interface NavbarState {
	active: boolean;
	navBarActiveClass: string;
}

export class Navbar extends React.Component<{}, NavbarState> {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: ''
		};
	}

	toggleHamburger = () => {
		// toggle the active boolean in the state
		this.setState(
			{
				active: !this.state.active
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.active
					? this.setState({
							navBarActiveClass: 'is-active'
					  })
					: this.setState({
							navBarActiveClass: ''
					  });
			}
		);
	};

	render() {
		return (
			<StaticQuery
				render={
					( { site: { siteMetadata: { navbar } } }: SiteMenuQuery ) => (
						<div className={ navbar.className }>
							<nav
								className="navbar"
								role="navigation"
								aria-label="main-navigation"
							>
								<div className="container">
									<div className="navbar-brand">
										<Link to="/" className="navbar-item" title="Logo">
											<img src={ navbar.logo.file } alt={ navbar.logo.alt } style={{ width: navbar.logo.width }} />
										</Link>
									{/* Hamburger menu */}
										<div
											className={`navbar-burger burger ${this.state.navBarActiveClass}`}
											data-target="navMenu"
											onClick={() => this.toggleHamburger()}
										>
											<span />
											<span />
											<span />
										</div>
									</div>
									<div
										id="navMenu"
										className={`navbar-menu ${this.state.navBarActiveClass}`}
									>
										<div className="navbar-start has-text-centered">
											{
												navbar.menuItems.map( menuItem =>
													menuItem.href.indexOf('http') >= 0
														? <a className="navbar-item" key={ menuItem.href } href={ menuItem.href }>{ menuItem.content }</a>
														: <Link className="navbar-item" key={ menuItem.href } to={ menuItem.href }>{ menuItem.content }</Link>
												)
											}
										</div>
									</div>
								</div>
							</nav>
						</div>
					)
				}
				query={graphql`
					query SiteMenu {
						site {
							siteMetadata {
							navbar {
								logo {
									file
									alt
									width
								}
								className
								menuItems {
									content
									href
								}
							}
							}
						}
					}
				`}
			/>
		);
	}
}

export default Navbar;
