import React, { Fragment } from 'react';

const MainContent = ({ name, detail, children }) => {
    const showMainContent = () => {
        return (
            <div className='container-fluid'>
                <div className='breadcrumb'>
                    <div className='breadcrumb-item'>
                        <a>{name}</a>
                    </div>
                    <div className='breadcrumb-item'>{detail}</div>
                </div>
                <div className='row'>{children}</div>
            </div>
        );
    };
    return <Fragment>{showMainContent()}</Fragment>;
};

export default MainContent;
