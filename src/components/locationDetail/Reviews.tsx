import * as React from "react";


const Reviews = (props: any, index: any) => {
    const { whoseReviewHeading,c_tGIReviews} = props;
    const Totalreview = props.c_tGIReviews.totalOfReview.reting.map((e: any, index: number) => (
        <img className="retingstar h-6 w-6" src={e.url} />
      ))
  
    return (
      <>
      <div className="mainreview">
              <div className="reviewheading"><h1>{c_tGIReviews.reviewHeading}</h1></div>
              <div className="totalreview">
                {Totalreview}{props.c_tGIReviews.totalOfReview.total}</div>
            </div>
       <div className="whosereview">
        {props.c_tGIReviews.whoseReviewHeading.map((link:any,index:number)=>(
          <div>
           <h6>{link.whoseReview}</h6> 

            </div>
        ))}
       </div>
  
  
      </>
    );
  };
  
  export default Reviews;