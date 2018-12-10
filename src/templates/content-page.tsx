import React from 'react'
import { Link, graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import componentMap from '../content-components/index'

import '../styles/content.scss'

import Layout from '../layout/layout'
import { getTitleFromNode } from '../util/title'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: componentMap,
}).Compiler

const IndexPage = ({ data, pageContext }: any) => (
  <Layout activeSlug={data.markdownRemark.fields.slug}>
    <article className="content">
      {renderAst(data.markdownRemark.htmlAst)}
      <nav>
        {pageContext.prev && (
          <Link to={pageContext.prev.fields.slug}>
            {getTitleFromNode(pageContext.prev)}
          </Link>
        )}
        {pageContext.next && (
          <Link to={pageContext.next.fields.slug}>
            {getTitleFromNode(pageContext.next)}
          </Link>
        )}
      </nav>
    </article>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
        githubLink
      }
      frontmatter {
        title
      }
      headings {
        value
        depth
      }
    }
  }
`
