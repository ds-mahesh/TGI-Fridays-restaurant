import * as React from "react";
import "../../index.css";
const Header = (props: any) => {
  const { label, images, _site } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  })

  const Headermenu = props?._site?.c_headerMenu?.map((link: any, i: any) => (
    <a  key={i} href={link.link} style={{paddingLeft:"11px",paddingRight:"11px"}} >
      {link.label}
    </a>
  ));

  const Titlemenu = props?._site?.c_titleMenu?.map((link: any,i:any) => (
    <a key={i} href="">
      <img src={link.titleLogo?.url} alt={''} />
      <span>{link.titleLabel.label}</span>
    </a>
  ));

  return (
    <>
      <div className="header">
        <div className="titlemenu">
          {Titlemenu}
        </div>
        <div className="logo">
          <a>
            <img className="fridayslogo" src={props?._site?.logo.image.url} />
          </a>
        </div>
        <div className="headermenu">
          <nav className="navemenu">
            <ul className="menulist">
              <li> {Headermenu}</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
