import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children, config, pages, ...props }) {
  return (
    <div id="page" className="site palette-yellow">
        <Head>
            <title>{config.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i" rel="stylesheet"></link>
        </Head>
        <Header config={config} pages={pages}></Header>
        <div id="content" className="site-content">
            <main id="main" className="site-main inner">
                {children}
            </main>
            <Footer config={config}></Footer>
        </div>
        <script src="/assets/js/plugins.js"></script>
        <script src="/assets/js/main.js"></script>
    </div>
  )
}