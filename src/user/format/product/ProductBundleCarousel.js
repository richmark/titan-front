import React, { Fragment } from 'react';
import { Carousel, Container, Image } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';

const ProductBundleCarousel = () => {
    console.log(`${IMAGE_API}/images/others/Banner_Ads.png`);
    const aData = [
        {
            name: 'Pipe Tools',
            image: `${IMAGE_API}/images/others/Banner123.png`
        },
        {
            name: 'PowerTools',
            image: `${IMAGE_API}/images/others/Bundle_Ads.jpg`
        },
        {
            name : "Welding Machine",
            image: `${IMAGE_API}/images/others/Sale Ads.png`
        }
    ];

    const showCarouselItem = oBundle => {
        var sImage =
            oBundle.image === undefined
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS'
                : oBundle.image;
        return (
            <Fragment>
                <Image className='d-block w-100' src={sImage} />
            </Fragment>
        );
    };

    const showCarousel = aBundle => {
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

    return <Container>{showCarousel(aData)}</Container>;
};

export default ProductBundleCarousel;
