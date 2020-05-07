import Layout from '../components/Layout'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { sourcebitDataClient } from 'sourcebit-target-next'

export default function Home(props) {
  const posts = props.props.posts
  const config = props.configData
  console.log(props.props)
  return (
    <Layout config={config}>
        <div className="post-feed">
        {posts &&
          posts.map((post) => {
            let postDate = new Date(post.date)
            return (
          <article className="post">
            <header className="post-header">
              <h2 className="post-title"><Link href="/posts/[slug]" as={`/posts/${post.slug}`}><a rel="bookmark">{post.title}</a></Link></h2>
              <div className="post-meta">
                Published on <time className="published"
                  dateTime="2020-02-20 00:00">{postDate.toDateString()}</time>
              </div>
            </header>
            
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}><a className="post-thumbnail">
              <img className="thumbnail" src={post.image} alt="Federal Bureau of Control" />
            </a></Link>
            
            <div className="post-content">
            <ReactMarkdown source={post.description} />
            </div>
            <p className="read-more">
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}><a className="read-more-link">Keep reading <span className="icon-arrow-right" aria-hidden="true"></span></a></Link>
            </p>
          </article>
            )
          })}
        </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const configData = await import(`../data/config.json`)
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath('/')
  return {
    props: {
      configData: {
        ...configData
      },
      props
    }
  }
}