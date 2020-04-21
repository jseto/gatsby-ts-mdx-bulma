import * as React from 'react';
import { MDXRenderer } from "gatsby-plugin-mdx"

interface MarkdownBlockProps {
	className?: string;
	content: string;
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
	className,
	content,
}) => {

	return (
		<div className={`markdown-block ${ className? className : '' }`}>
		  <MDXRenderer>{ content }</MDXRenderer>
		</div>
	);
};

// export default MarkdownBlock;
