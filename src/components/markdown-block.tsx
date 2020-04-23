import * as React from 'react';
import { MDXRenderer } from "gatsby-plugin-mdx"

interface MarkdownBlockProps {
	className?: string;
	children: string;
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
	className,
	children,
}) => {

	return (
		<div className={`markdown-block ${ className? className : '' }`}>
		  <MDXRenderer>{ children }</MDXRenderer>
		</div>
	);
};

// export default MarkdownBlock;
