import * as React from "react";
import { regionNames } from "../../../sites-global/global";

const Address = (props: any) => {
    const { address,mainPhone } = props;
    var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
    var gmapsAddress = gmaps.concat(address.line1, ' ', address.city, ' ', address.region, ' ', address.postalCode);
    var gmapsLink = gmapsAddress.concat('"');

  return (
    <>
      <div className="address notHighlight ">
        {/* <a href={gmapsLink} target="_blank" className="hover:underline"> */}
            <div className="flex space-x-2" ><span>{address.line1}</span>
            {address.line2 && (<div><span className="notHighlight">{address.line2}</span></div>)}</div>
            <div ><span className="notHighlight">{address.city}, {address.region} {address.postalCode}</span> </div>
            {<div ><span className="notHighlight">{regionNames.of(address.countryCode)}</span></div>}
            <div><span>{mainPhone}</span></div>
        {/* </a> */}
      </div>
    </>
  );
};

export default Address;
