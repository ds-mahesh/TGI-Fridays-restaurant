import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import GetDirection from "../commons/GetDirection";
import redmapimage from "../../images/red-map.svg";
import Phonesvg from "../../images/phone.svg";
import timesvg from "../../images/watch-icn.svg"
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";
import Hours from "../commons/hours";
import Holidayhours from "../locationDetail/Holdayhours";
import Model from "../locationDetail/Model";


const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}
let array = [];

const LocationCard: CardComponent<Location> = ({ result }) => {

  let url = "";
  const [hoursopen, setHoursopen] = React.useState(false);

  function opentime(e: any) {
    //console.log(e.target);
    var closethis = e.target.closest(".lp-param-results");
    if (closethis.querySelector('.storelocation-openCloseTime').classList.contains("hidden")) {
      closethis.querySelector('.storelocation-openCloseTime').classList.remove("hidden")
      setHoursopen(true);
    }
    else {
      closethis.querySelector('.storelocation-openCloseTime').classList.add("hidden")
      setHoursopen(false);
    }
  }

  function show_hide() {
    var click: any = document.getElementById("list-hours");
    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }

  const { address, hours, mainPhone, c_hoursAmenities } = result.rawData;
  //     var name: any = result.rawData.name?.toLowerCase();
  //   var region: any = result.rawData.address.region?.toLowerCase();
  //   var initialregion: any = region.toString();
  //   var finalregion: any = initialregion.replaceAll(" ", "-");
  //   var city: any = result.rawData.address.city?.toLowerCase();
  //   var initialrcity: any = city.toString();
  //   var finalcity: any = initialrcity.replaceAll(" ", "-");
  //   var string: any = name.toString();
  //   let result1: any = string.replaceAll(" ", "-");
  //  if (!result.rawData.slug) {
  //    url= `/${result.rawData.id}-${result1}.html`;
  //  } else {
  //    url= `/${result.rawData.slug.toString()}.html`;
  //  }

  return (
    <div className={`location result-list-inner-${result.id} result`} id={`result-${result.id}`} key={`result-${result.rawData.id}`}>
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row">
              <div className="icon text-black relative"> <img className=" " src="https://th.bing.com/th/id/OIP.Bi9ogpKNDPfaQb0eTwI-iwHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7" width="20" height="20"
                alt={''} />
                {/* <span className="map-count">D</span> */}
                </div>
              <h2><Link className="inline-block notHighlight"
                data-ya-track={`viewDetail -${result.rawData.name}`}
                eventName={`viewDetail -${result.rawData.name}`}
                rel="noopener noreferrer"
                href={`/${result.rawData.id}`}>{result.rawData.name}
              </Link></h2>
              {typeof result.distance != "undefined" ?
                <div className="distance">
                  {metersToMiles(result.distance)} <span>{StaticData.miles}</span>
                </div>
                : ''}
            </div>


            <div className="icon-row content-col address-with-availablity notHighlight">
              <div className="smalllocationcard">
                <div className="w-full">
                  <div className="address-cta flex">
                    <div className="addsec">
                      <Address address={address} />
                    </div>
                   
                  </div>
                  <div className="phoneno flex" >
                        <img src={Phonesvg} alt={''} />
                        <span> {mainPhone}</span></div>

                  {result.rawData.hours ? <>
                    <div className="mt-2">
                      <div className="hours-services">
                        {/* <div><Model
                        name={StaticData.Holdiay}
                        holidayHours={hours.holidayHours}
                      /></div> */}
                        {/* <h6>Opening Hours</h6> */}
                        {result.rawData.hours?.reopenDate ? <>
                          <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
                          <div className=" flex open-now-string items-center " data-id={`main-shop-${result.rawData.id}`} onClick={opentime}>
                            {StaticData.tempClosed}
                          </div>
                        </>
                          : <>
                          {/* <img src="https://www.freeiconspng.com/thumbs/timer-icon/timer-icon-15.png" width="20" height="20" alt=''/> */}
                            <div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
                              <button onClick={show_hide} className=" flex open-now-string items-center" data-id={`main-shop-${result.rawData.id}`} >
                                <OpenClose
                                  timezone={result.rawData.timezone}
                                  hours={result.rawData.hours}
                                  deliveryHours={result.rawData.hours}>
                                </OpenClose>
                                <img className="h-9 w-9" src="https://cdn-icons-png.flaticon.com/128/9347/9347220.png" alt="" style={{ marginLeft: "5px", marginTop: "5px" }} />
                              </button>
                              <div id="list-hours" className="dropdown-content" style={{ display: "none" }}>
                                <Hours hours={hours} />
                              </div>
                            </div>
                          </>}
                        {/* <div className="servicesoncard grid-container">
                          {c_hoursAmenities.tGIlist.map((e: any) =>
                            <span>*{e.label}</span>
                          )
                          }
                        </div> */}
                        
                      </div>
                      <div className="button-bx">
                      <div className="btn-locationcard flex space-x-9">
                        <Link type="button" href={`/${result.rawData.id}`} className=" btn notHighlight "
                          data-ya-track={`viewStore -${result.rawData.name}`}
                          eventName={`viewStore -${result.rawData.name}`}
                          rel="noopener noreferrer"
                        >
                          {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                          {StaticData.StoreDetailbtn}
                        </Link>
                        {result.rawData.displayCoordinate ?
                          <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
                          : <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
                      </div>
                    </div>

                      {/* <div className={`storelocation-openCloseTime  capitalize hidden`}>
                    {hoursopen?
                   typeof result.rawData.hours === "undefined" ? ("") :
                     <Hours key={result.rawData.name} additionalHoursText={result.rawData.additionalHoursText} hours={result.rawData.hours} c_specific_day={result.rawData.c_specific_day} />
                   :''}
                </div> */}
                    </div></> : <div className="closeddot notHighlight red-dot">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                      <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
                    </svg>
                    {/* <div className="hours-info text-lg font-second-main-font closeddot">
                      Closed
                    </div> */}

                  </div>}
                </div>
              </div>
            </div>

            {/* <div className="button-bx">
              <Link type="button" href={`/${result.rawData.id}`} className=" btn notHighlight "
                data-ya-track={`viewStore -${result.rawData.name}`}
                eventName={`viewStore -${result.rawData.name}`}
                rel="noopener noreferrer"
              > */}
            {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
            {/* {StaticData.StoreDetailbtn} */}
            {/* </Link>
              {result.rawData.displayCoordinate ?
                <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
                : <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
            </div> */}



          </div>

        </div>
      </div>
    </div>

  );

}

export default LocationCard;