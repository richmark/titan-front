import React, { Fragment, useState } from 'react';
import {
    Card,
    Container,
    Image,
    Col,
    Row,
    Button,
    Table
} from 'react-bootstrap';

const AdditionalInfo = aData => {
    const showAdditionalInfo = aAdditionalInfo => {
        console.log(aAdditionalInfo);
        return (
            <Container>
                <Table responsive className='text-center'>
                    <tbody>
                    {aAdditionalInfo && aAdditionalInfo.map((aValue, iIndex) => {
                        return (
                            <Fragment key={iIndex}>
                                <tr>
                                    <th>
                                    {aValue.key}
                                    </th>
                                    <td>
                                    {aValue.value}
                                    </td>
                                </tr>
                            </Fragment>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        );
    };

    return <Container>{showAdditionalInfo(aData)}</Container>;
};

export default AdditionalInfo;
