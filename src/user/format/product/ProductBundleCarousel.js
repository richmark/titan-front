import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Image } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { listBanner } from '../../../core/admin/banner/bannerApi';

const ProductBundleCarousel = () => {

    const [aBanner, setBanner] = useState([]);

    useEffect(() => {
        listBanner().then((oData) => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setBanner(oData.data);
            }
        });
    }, []);

    const showCarouselItem = oBundle => {
        var sImage =
            oBundle.banner_image === undefined
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS'
                : `${IMAGE_API}/images/banners/${oBundle.banner_image}`;
        return (
            <Fragment>
                <a href={`${oBundle.banner_link}`} target="_blank">
                    <Image className='d-block w-100' src={sImage} />
                </a>
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

    return aBanner.length > 0 && <Container>{showCarousel(aBanner)}</Container>;
};

export default ProductBundleCarousel;
