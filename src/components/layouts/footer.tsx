import * as React from "react";
import "../../index.css";
import { cookieText, cookiesUrl } from "../../../sites-global/global"
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../../sites-global/staticData";
import { useEffect, useState } from "react";
import Link from "../commons/Link";

const Footer = (props: any) => {
	const { footer, _site } = props;
	// const [isNavVisible, setNavVisibility] =  useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	console.log(footer)
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");
		mediaQuery.addListener(handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = (mediaQuery: any) => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};
	// if (typeof window !== "undefined") {
	// 	mediaQuery = window?.innerWidth;
	// }

	const Socialicons = props?._site?.c_socialIcons?.map((link: any, i: any) => (
		<a key={i} href="">
			<img className="h-9 w-9" src={link.url} alt={''} />
		</a>
	));

	const Footermenus = props?._site?.c_footerMenus?.map((link: any, i: any) => (
		<a key={i} href={link.link}>
			{link.label}
		</a>
	));

	const Footermenus1 = props?._site?.c_footermenus1?.map((link: any, i: any) => (
		<a key={i} href={link.link}>
			{link.label}
		</a>
	));
	return (
		<>

			<footer className="site-footer inline-block">
				<div className="socialicons">
					<ul className="sociallist">
						<li>{Socialicons} </li>
					</ul>
					<hr />
				</div>
				<div className="footermenus">
					<p className=" footermenus1 flex flex-col"> {Footermenus}</p>
					<p className=" footermenus2 flex flex-col">{Footermenus1}</p>

					<div className="downloadapp">
						<div className="app">
							<p>{props?._site?.c_appDownloadLink.heading}</p>
							<div className="googlelogo flex space-x-9">
								{props?._site?.c_appDownloadLink?.iconLogo?.map((link: any, i: any) => (
									<a href=" ">
										<img key={i} src={link.url} alt={''} />
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="bootomfooter">
					<div className="footerdata">
						<div className="footerlogo">
							<img style={{}} src={props?._site?.c_bootomFooterData.footerLogo.url} alt={''} />
						</div>
						<div className="footerdescription">
							<p>{props?._site?.c_bootomFooterData.footerDescription}</p>
						</div>
						<div className="bottomfooterlink">
						<ul className="bottomfooterlist flex space-x-4" >
							{props?._site?.c_bootomFooterData.footerLinks.map((link: any, i: any) => (
								
									<li className="">
										<a key={i} href={link.link} >
											{link.label}
										</a>
									</li>
								
							))}
							</ul>
						</div>
					</div>
				</div>



			</footer>

			<CookieConsent
				buttonText={"Accept"}
				buttonStyle={{
					marginLeft: "100px",
				}}
			>
				<p>
					{cookieText}
					<a className="text-cookies-link" href={cookiesUrl}>
						{StaticData.cookie}
					</a>
					.
				</p>
			</CookieConsent>
		</>
	);
};

export default Footer;
function handleMediaQueryChange(mediaQuery: MediaQueryList) {
	throw new Error("Function not implemented.");
}

