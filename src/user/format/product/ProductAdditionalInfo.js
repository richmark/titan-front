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
                    {aAdditionalInfo.length && aAdditionalInfo.map((aValue, iIndex) => (
                        <tr key={iIndex}>
                            <th>
                            {aValue.key}
                            </th>
                            <td>
                            {aValue.value}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    return <Container>{showAdditionalInfo(aData)}</Container>;
};

export default AdditionalInfo;
