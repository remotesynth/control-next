import Layout from '../components/Layout'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { sourcebitDataClient } from 'sourcebit-target-next'
import configData from '../data/config.json'

export default function Home(props) {
  const posts = props.posts
  const pages = props.pages
  const config = props.configData

  return (
    <Layout config={config} pages={pages}>
        <div className="post-feed">
        {posts &&
          posts.map((post,index) => {
            let postDate = new Date(post.page.date)
            return (
          <article className="post" key={index}>
            <header className="post-header">
              <h2 className="post-title"><Link href="/posts/[slug]" as={`${post.path}`}><a rel="bookmark">{post.page.title}</a></Link></h2>
              <div className="post-meta">
                Published on <time className="published"
                  dateTime="2020-02-20 00:00">{postDate.toDateString()}</time>
              </div>
            </header>
            
            <Link href="/posts/[slug]" as={`${post.path}`}><a className="post-thumbnail">
              <img className="thumbnail" src={post.page.image} alt="{post.page.title}" />
            </a></Link>
            
            <div className="post-content">
            <ReactMarkdown source={post.page.description} />
            </div>
            <p className="read-more">
              <Link href="/posts/[slug]" as={`${post.path}`}><a className="read-more-link">Keep reading <span className="icon-arrow-right" aria-hidden="true"></span></a></Link>
            </p>
          </article>
            )
          })}
        </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const sb = await sourcebitDataClient.getData()
  const pages = sb.pages.filter(page => page.path !== '/' && !page.path.startsWith('/posts/'))
  const posts = sb.pages.filter(page => page.path !== '/' && page.path.startsWith('/posts/'))
  return {
    props: {
      configData,
      pages,
      posts
    }
  }
}