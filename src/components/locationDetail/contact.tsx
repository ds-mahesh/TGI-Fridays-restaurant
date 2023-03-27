import * as React from "react";
import Cta from "../commons/cta";
import Hours from "../commons/hours";
import woodtexture from "../../images/wood-texture.jpg";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../../sites-global/staticData";
import Holidayhours from "./Holdayhours";
import Model from "./Model";
import CustomMap from "./CustomMap";

const Contact = (props: any) => {
  const {
    address,
    phone,
    latitude,
    longitude,
    hours,
    c_specific_day,
    additionalHoursText,
    yextDisplayCoordinate,
    c_storeInfoHeading,
    c_getDirectionsCTAText,
    c_hoursAmenities,
    c_dishesMenu
  } = props;

  // const Hoursamenities = props.c_hoursAmenities.tGIlist.map((e: any, index: number) => (
  //   <div className="sortofamenities">
  //   <ul>
  //     <li>{e.label}</li>
  //   </ul>
  //   </div>
  //   ))
  return (
    <>

      {/* <h4 className="box-title">{c_storeInfoHeading?c_storeInfoHeading:"Store Details"}</h4> */}
      <div>
        <div className="mapsecorderbtn flex space-x-4">
          <button className="mapsecctabtn " >ORDER NOW
          </button>
          <ul className="">
            <li className="button-bx direction-button">
              <GetDirection
                buttonText={c_getDirectionsCTAText ? c_getDirectionsCTAText : StaticData.getDirection}
                address={address}
                latitude={latitude}
                longitude={longitude}
              />
            </li>
          </ul>
          <button className="mapsecwaitlist">JOIN THE WAITLIST</button>
        </div>

        <div className="mainhoursamenities">
          {hours && typeof hours.monday != "undefined" ? (
            <div className="hours">
              <div className="hours-sec">
                <div className="title-with-link-1">
                  <h4 className="box-title">{"RESTAURANT HOURS"}</h4>
                </div>
                <div className="hours-div mb-5 md:mb-1 flex flex-col">
                  {hours.holidayHours && typeof hours.reopenDate == "undefined" ? (
                    <>
                      <Model
                        name={StaticData.Holdiay}
                        holidayHours={hours.holidayHours}
                        c_specific_day={c_specific_day}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  {/* <div className="title-with-link-1">
        <h4 className="box-title">{"Store Hours"}</h4>        
      </div> */}
                  {hours && (
                    <Hours
                      title={"Store Opening Hours"}
                      additionalHoursText={additionalHoursText}
                      hours={hours}
                      c_specific_day={c_specific_day}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="hoursamenities">
            <h5>{props.c_hoursAmenities.headname}</h5>
            <div className="sortlist">
              {props.c_hoursAmenities.tGIlist.map((link: any, i: any) => (
                <ul>
                  <li>
                    {link.label}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="map-sec">

        <CustomMap prop={yextDisplayCoordinate} />


        <div className="icon-row content-col">
          <hr />
          <div className="  address-text notHighlight">
            <span>ADDRESS :</span>
            <span>{address.line1} </span>
            <span>{address.line2 && address.line2} , {address.region} {address.postalCode}</span>

            {/* <div>{address.city}</div> */}

            <div className="address-extrades">{address.extraDescription}</div>
          </div>
          {phone ? (
            <div className="icon-row">
              <div className="content-col">
                <a id="address" className=" location-phn" href={`tel:${phone}`}>
                  PHONE : {phone}
                </a>
              </div>
            </div>

          ) : (
            ""
          )}

        </div>


        <hr />

      </div>
    </>
  );
};

export default Contact;
