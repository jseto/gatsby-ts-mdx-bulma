import * as React from "react"

export interface ScriptLoaderProps {
	script: string;
	initScript?: ()=>void;
	children?: React.ReactElement;
}

export class ScriptLoader extends React.Component< ScriptLoaderProps > {
	componentDidMount() {
    const { script, initScript } = this.props

		const id = "id-" + script
		if ( document.getElementById( id ) ) {
			if ( initScript ) initScript()
			return
		}
		const bodyElement = document.getElementsByTagName( 'body' )[0];
		const scriptElement = document.createElement( 'script' )

		scriptElement.type = 'text/javascript'
		scriptElement.src = script
		scriptElement.id = id;

		// if ( window ) {
		//   window.onload = ()=> bodyElement.append( scriptElement )
		// }
		bodyElement.append( scriptElement )
	}

	render() {
		const { children } = this.props

		return ( <>{children}</> )
	}
}