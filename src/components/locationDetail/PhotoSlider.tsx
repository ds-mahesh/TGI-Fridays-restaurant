import * as React from "react";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Options } from '@splidejs/splide';


const PhotoSlider = (props: any, index: any) => {
  const { photoGallery, height, width,} = props;

  const mainOptions: Options = {
    type: 'loop',
    perPage: 4,
    perMove: 3,
    pagination: true,

  };



  // const Happensatcultura =props?.c_newsStore?.map((link: any) => (
  const Dishesmenu = props?.c_dishesMenu?.map((link: any) => (
    <SplideSlide>
      <div className="menues">
        <div>
      <img  src={link.menuimage?.url} alt={''} />
      </div>
      <div className="orderbtn">
      <button className="ctabtn btndefault" >
       
        {link.menuorder.label}
        
      </button>
      </div>
      </div>
    </SplideSlide>
  ));


  return (
    <>
      <Splide area-label="photo slider"
        options={mainOptions}>

 
        {Dishesmenu}

       
      </Splide>


    </>
  );
};

export default PhotoSlider;