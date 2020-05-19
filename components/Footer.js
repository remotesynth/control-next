import ReactMarkdown from "react-markdown"

export default function Layout({ children, config, ...props }) {
    return (
        <footer id="colophon" className="site-footer inner">
          <div className="site-info"><ReactMarkdown source={config.footerContent} /></div>
        </footer>
    )
}