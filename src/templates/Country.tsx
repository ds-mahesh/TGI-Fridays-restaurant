import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
import { favicon, regionNames, stagingBaseurl } from "../../sites-global/global";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import LocationLayout from "../components/layouts/Locationsearch";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";



/**
 * Required when Knowledge Graph data is used for a template.
 */
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "ce_country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "slug",
      "c_bannerphoto",
      // "c_locatorBannerImage",
      // "c_locatorBannerTitle",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],
      savedFilterIds: [
        "dm_stores-directory_address_countrycode"
      ]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = "/" + document.slug.toString() + ".html";
  return "/" + document.slug.toString() + ".html";
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: 'icon',
          type: 'image/x-icon',
          href: favicon
        },
      }
    ],
  };
};




const country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    slug,
    _site,
    address,
    c_bannerphoto,
    c_locatorBannerImage,
    c_locatorBannerTitle,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

  const Bannerimage=c_bannerphoto.map((link:any,i:any)=>(
    <img key={i} src={link.url} alt={''}/>
  ))

  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any,index:number) => {
    let detlslug;


    if (typeof entity.dm_directoryChildren != "undefined") {
      if (entity.dm_directoryChildrenCount == 1) {
        entity.dm_directoryChildren.map((res: any) => {

          let detlslug1 = "";

          if (!res.slug) {
            let slugString = res.id + " " + res.name;
            let slug = slugString;
            detlslug1 = `${slug}.html`;
          } else {
            detlslug1 = `${res.slug.toString()}.html`;
          }
          if (res.meta.entityType.id == 'ce_city') {
            detlslug1 = "gb/" + detlslug1;
          } else {
            detlslug1 = detlslug1;
          }

          // console.log(entity.name, res);

          res.dm_directoryChildren ? res.dm_directoryChildren.map((detl: any) => {

            if (!detl.slug) {
              let slugString = detl.id + " " + detl.name;
              let slug =slugString;
              detlslug1 = `${slug}.html`;
            } else {
              detlslug1 = `${detl.slug.toString()}.html`;
            }

            detlslug = detlslug1;

          }) : detlslug = detlslug1;


        })
      }
      else {
        detlslug = slug + "/" + entity.slug + ".html";
      }
    }

    return (
      <li key={index} className=" storelocation-category">
        <a
          key={entity.slug}
          href={slug +"/"+ entity.slug + ".html"}
        >
          {entity.name} ({entity.dm_directoryChildrenCount})
        </a>
      </li>
    )
  }) : null;


  // let bannerimage = c_locatorBannerImage ? c_locatorBannerImage.map((element: any) => {
  //   return element.url
  // }) : null;

  return (
    <>
      <PageLayout _site={_site}>
      <BreadCrumbs
          name={regionNames.of(name)}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>
        <div className="country-banner">
          <div className="imgcount">
               {Bannerimage}
          </div>
       
          <div className="country-search-bar" style={{}}>
            <SearchHeadlessProvider
                experienceKey={AnswerExperienceConfig.experienceKey}
                locale={AnswerExperienceConfig.locale}
                apiKey={AnswerExperienceConfig.apiKey}
                verticalKey={AnswerExperienceConfig.verticalKey}
                experienceVersion="STAGING"
                sessionTrackingEnabled={true}
                endpoints={AnswerExperienceConfig.endpoints}    
              >
                
                <LocationLayout _site={_site}/>
          
              </SearchHeadlessProvider>
              </div>
          </div>
        

        {/* <BreadCrumbs
          name={regionNames.of(name)}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs> */}
        {/* <div className="location-dtl">
          <Banner name={regionNames.of(name)} c_bannerImage={bannerimage} />
        </div> */}
        <div className="content-list" style={{backgroundColor:"#000"}}>
          <div className="container">
            <div className="sec-title">
              <h2 style={{ textAlign: "center" }}>
                {/* {StaticData.AllRegion} {regionNames.of(name)}{" "} */}
                All locations in the United States, we make it easy to find your Fridays™ 
              </h2>
            </div>

            <ul className="region-list">

              {childrenDivs}
            </ul>

          </div>
        </div>
       
      </PageLayout>
    </>
  );
};

export default country;
