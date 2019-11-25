import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { sendSignout } from '../core/client/clientApi';
import CardResponse from './format/CardResponse';

const Signout = () => {
    sendSignout().then(oData => {
        console.log(oData);
    });
    return (
        <Layout title='Signout' description='User Signout'>
            {CardResponse('You have logged out!', 'Back to Login', '/login')}
        </Layout>
    );
};

export default Signout;