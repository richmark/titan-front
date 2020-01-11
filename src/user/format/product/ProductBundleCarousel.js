import React, { Fragment } from 'react';
import { Carousel, Container, Image } from 'react-bootstrap';

const ProductBundleCarousel = () => {
    const aData = [
        {
            name : "Pipe Tools",
            image: "https://titansupertools.com/wp-content/uploads/2018/09/YJ-26RH3-WEB-BANNER-Rotary-Hammer-Drill-052519.jpg"
        },
        {
            name : "PowerTools",
            image: "https://titansupertools.com/wp-content/uploads/2018/09/YJ-26RH3-WEB-BANNER-Rotary-Hammer-Drill-052519.jpg"
        },
        {
            name : "Welding Machine",
            image: "https://titansupertools.com/wp-content/uploads/2018/09/YJ-26RH3-WEB-BANNER-Rotary-Hammer-Drill-052519.jpg"
        },
        {
            name : "Accessories",
            image: "https://titansupertools.com/wp-content/uploads/2018/09/YJ-26RH3-WEB-BANNER-Rotary-Hammer-Drill-052519.jpg"
        },
        
    ];

    const showCarouselItem = (oBundle) => {
        var sImage = (oBundle.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oBundle.image;
        return (
            <Fragment>
                <Image
                    className="d-block w-100"
                    src={sImage}
                />
            </Fragment>
        );
    }

    const showCarousel = (aBundle) => {
        return (
            <Carousel>
                {aBundle.map((oBundle, iIndex) => {
                    return (
                        <Carousel.Item key={iIndex}>
                            {showCarouselItem(oBundle)}
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        );
    };
    
    return (
        <Container>
            <div className="category-tab mb-5"><strong><p className="mb-0 absolute" style={{position: 'relative', top: '43px', left: '50px'}}>Bundle Deals</p></strong></div>
            {showCarousel(aData)}
        </Container>
    );
}

export default ProductBundleCarousel;
