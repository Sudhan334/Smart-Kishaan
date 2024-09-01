import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"

import { toast } from "react-toastify";
import bannerSvc from "../../../pages/cms/banner/banner.service";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./banner.css"

const HomePageBanner = ()=>{
    const settings = {
        
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed: 1500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [banner, setBanner] = useState();
    const getListOfBanners = useCallback(async()=>{
        try{
            const data = await bannerSvc.getBannerForHome()
            if(data.result){
                setBanner(data.result)
            }
    
        }
        catch(except){
            toast.error("Error fetching Banner list")
        }
    }, [])

    useEffect(()=>{
        getListOfBanners()
    }, [])

    return (<>
        {/* <Container>
            <Row>
                <Col sm={12} md={12}  >
                    <Slider {...settings} >
                        {
                            banner && banner.map((row, ind) => (
                                <div key={ind}>
                                    <a href={row.url} target="_banner">
                                        <img onError={(e) => {
                                            e.target.src="https://dummyimage.com/1200x400/ebebeb/737373.png&text=No+Image+Found"
                                        }} src={import.meta.env.VITE_IMAGE_URL+"banners/"+row.image} className="img img-fluid" />
                                    </a>
                                </div>
                            ))
                        }
                    </Slider>
                </Col>
            </Row>
        </Container> */}
        <Container>
    <Row>
        <Col sm={12} md={20}>
            <div className="slider-background">
                <Slider {...settings}>
                    {banner && banner.map((row, ind) => (
                        <div key={ind}>
                            <a href={row.url} target="_banner">
                                <img 
                                    onError={(e) => {
                                        e.target.src = "https://dummyimage.com/1200x400/ebebeb/737373.png&text=No+Image+Found";
                                    }} 
                                    src={import.meta.env.VITE_IMAGE_URL + "banners/" + row.image} 
                                    className="img img-fluid" 
                                    alt="Banner"
                                />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </Col>
    </Row>
    {/* Add other content here */}
    <div className="content">
        {/* Your other content goes here */}
    </div>
</Container>
    </>)
}

export default HomePageBanner