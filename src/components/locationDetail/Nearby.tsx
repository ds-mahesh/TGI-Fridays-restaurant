import * as React from "react";
import ApiCall from "../../Apis/ApiCall";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose"
import timesvg from "../../images/watch-icn.svg"
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg"
import { Addresssvg, mobilesvg, View_Store } from "../../../sites-global/global";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import { StaticData } from "../../../sites-global/staticData";

export default function Nearby(props: any) {

  const [neabyData, setnearbyData] = React.useState(props.externalApiData.response.results);
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  }

 
  return (

    <>
      {/* <Splide
        id="splide-nearby"
        options={{
          rewind: false,
          type: "slide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1279: {
              perPage: 1,
              drag: true,
              pagination: true,
              arrows: false,
              type: "splide",
            },
          },
        }}
      > */}
      {neabyData.map((location: any, index: number) => {

        let url = "";
        var name: any = location.data.name?.toLowerCase();
        var region: any = location.data.address.region?.toLowerCase();
        var initialregion: any = region.toString();
        var finalregion: any = initialregion.replaceAll(" ", "-");
        var city: any = location.data.address.city?.toLowerCase();
        var initialrcity: any = city.toString();
        var finalcity: any = initialrcity.replaceAll(" ", "-");
        var string: any = name.toString();
        let result1: any = string.replaceAll(" ", "-");
        if (!location.data.slug) {
          url = `/${location.data.id}-${result1}.html`;
        } else {
          url = `/${location.data.slug.toString()}.html`;
        }

        if (index > 0) {
          return (
            <>
              {/* <SplideSlide key={index}> */}
              <div className="nearby-card" key={index}>
                <div className="location-name-miles icon-row flex space-x-2">
                  <img src="https://th.bing.com/th/id/OIP.jI9rruGSAQNGmMicjyVJFAHaI7?pid=ImgDet&rs=1" alt="" height="20" width="20" />
                  <h2><Link className="inline-block notHighlight" href={`/${location.data.id}`}
                    data-ya-track={`${location.data.name}`}
                    eventName={`${location.data.name}`}
                    rel="noopener noreferrer">{location.data.name}</Link></h2>
                     {typeof location.distance != "undefined" ?
                <div className="distance">
                  {metersToMiles(location.distance)} <span>{StaticData.miles}</span>
                </div>
                : ''}

                </div>
                <div className="icon-row content-col">
                  <Address address={location.data.address} />
                </div>
                <div className="nearby-telephone flex space-x-2">
                  <img src="https://th.bing.com/th/id/R.b3e6b77621eee17c8e71200a645bc86c?rik=%2bV15I8fAFFQPLQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_286076.png&ehk=fo8Zy8rYG7B%2bgx53Zx2vljsMPUbauUtRS9thGIR%2bBL8%3d&risl=&pid=ImgRaw&r=0" alt="" height="20" width="20"/>
                <span className="telephone">Telephone</span>
                </div>
                <span style={{paddingLeft:"26px",fontSize:"1.25rem"}}>{location.data.mainPhone}</span>
                <div className="icon-row closeing-div flex space-x-2">
                  {location.data.hours ?
                    <div className="flex open-now-string items-center " data-id={`main-shop-${location.data.id}`} >
                      <OpenClose timezone={location.data.timezone} hours={location.data.hours} deliveryHours={location.data.hours}></OpenClose>
                    </div> :
                    <div className="closeddot notHighlight red-dot">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
                      </svg>
                      <div className="hours-info text-lg font-second-main-font closeddot">
                        Closed
                      </div>
                    </div>
                  }
                </div>
                <div className="button-bx">
                  <Link className="btn" href={`/${location.data.id}`}
                    data-ya-track={`viewstore-${location.data.name}`}
                    eventName={`viewstore-${location.data.name}`}
                    rel="noopener noreferrer">
                    {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                    STORE DETAILS</Link>
                  <GetDirection buttonText={props.c_getDirectionsCTAText ? props.c_getDirectionsCTAText : "Get directions"} address={location.data.address} latitude={location.data.displayCoordinate ? location.data.displayCoordinate.latitude : location.data.yextDisplayCoordinate.latitude} longitude={location.data.displayCoordinate ? location.data.displayCoordinate.longitude : location.data.yextDisplayCoordinate.longitude} />

                </div>
              </div>
              {/* </SplideSlide> */}
            </>

          )
        }
      }

      )
      }
      {/* </Splide> */}
    </>
  )
}
