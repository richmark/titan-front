import React, { Fragment } from 'react';
import Menu from './Menu';
import Navbar from './Navbar';
import MainContent from './MainContent';

const DashboardLayout = ({ name, detail, children }) => {
    return (
        <Fragment>
            <div id='wrapper'>
                <Menu />
                <div id='content-wrapper' className='d-flex flex-column'>
                    <div id='content'>
                        <Navbar />
                        <MainContent
                            name={name}
                            detail={detail}
                            children={children}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardLayout;
