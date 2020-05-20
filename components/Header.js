import Link from 'next/link'

class Header extends React.Component {
  
  render() {
    const config = this.props.config
    const pages = this.props.pages
    const page = this.props.page
    const headerStyle = {
        backgroundImage: 'url(' + config.bgimage + ')',
    };
    return (
    <header id="masthead" className="site-header">
        <div id="header-bg" className="site-header-bg" style={headerStyle}></div>
        <div className="site-header-scroll">
          <div className="site-header-inside">
            <div className="site-header-vertical">
              <div className="site-branding">
                <p className="site-logo">
                  <Link href='/'><img src={config.logo} alt="Logo" /></Link>
                </p>
                <h1 className="site-title"><Link href='/'><a>{ config.title }</a></Link></h1>
                <p className="site-description">{ config.tagline }</p>
              </div>
              <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                <div className="site-nav-wrap">
                  <div className="site-nav-inside">
                    <ul className="menu">
                      <li className="menu-item ">
                        <a href="/">Home</a>
                      </li>
                      {pages &&
                        pages.map((page, index) => {
                          return (
                      <li className="menu-item" key={index}>
                        <Link href="[slug]" as={`${page.path}`}><a>{page.page.title}</a></Link>
                      </li>
                          )
                      })}
                    </ul>
                  </div>
                </div>
              </nav>
              <button id="menu-toggle" className="menu-toggle"><span className="screen-reader-text">Menu</span><span className="icon-menu"
                  aria-hidden="true"></span></button>
            </div>
          </div>
        </div>
      </header>
    )
  }

  componentDidMount() {
    // TODO: Update this as it is a bit of a hack used because I am retrofitting a layout not built for react
    const header = document.querySelector('#masthead')
    header.classList.add('bg--loaded')
  }
}

export default Header