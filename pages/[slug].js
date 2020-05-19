import Layout from '../components/Layout'
import ReactMarkdown from "react-markdown"
import { sourcebitDataClient } from 'sourcebit-target-next'

export default function Home(props) {
  const page = props.page
  const pages = props.pages
  const config = props.configData

  // swap the background image for the image on this page
  if (page.page && page.page.image)
    config.bgimage = page.page.image
  return (
    <Layout config={config} pages={pages}>
        <article className="post page post-full">
            <header className="post-header">
                <h1 className="post-title">{page.page.title}</h1>
            </header>
            <div className="post-subtitle">
                <ReactMarkdown source={page.page.subtitle} />
            </div>
            <div className="post-content">
                <ReactMarkdown source={page.page.body} />
            </div>
        </article>
    </Layout>
  )
}

export async function getStaticPaths() {
    const paths = await sourcebitDataClient.getStaticPaths();
    return {
        paths: paths.filter(path => path !== '/' && !path.startsWith('/posts/')),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const configData = await import(`../data/config.json`)
    const sb = await sourcebitDataClient.getData()
    const pagePath = '/' + params.slug
    const page = sb.pages.filter(page => page.path == pagePath)[0]
    const foo = await sourcebitDataClient.getStaticPropsForPageAtPath('/posts/federal-bureau-of-control')
    console.log(foo)
    const pages = sb.pages.filter(page => page.path !== '/' && !page.path.startsWith('/posts/'))

    return {
        props: {
        configData: {
            ...configData
        },
        page,
        pages
        }
    }
}