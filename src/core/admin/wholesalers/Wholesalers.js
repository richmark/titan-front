import React, { Fragment, useEffect, useState } from 'react';
import { getAllWholesalers } from './wholesalersApi';
import { isAuthenticated } from '../../../auth/authUtil';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";

const Wholesalers = () => {
    const { sToken, user } = isAuthenticated();
    const [wholesalers, setWholesalers] = useState([]);
    const init = () => {
        getAllWholesalers(user._id, sToken).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setWholesalers(oData.data);
            }
        });
    };
    useEffect(() => {
        init();
    }, []);
    const showWholesalers = () => {
        const oData = wholesalers;
        const oColumns = [
            {
                name: "Company Name",
                selector: "company_name",
                sortable: true,
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`wholesalers/${oRow._id}`}>
                            {oRow.company_name}
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Status",
                selector: "verified_admin",
                sortable: true,
                cell: oRow => {
                    return (
                        <Fragment>
                            {oRow.verified_admin ?  'Verified' : 'Pending'}
                        </Fragment>
                    )
                }
            },
            {
                name: 'Type',
                cell: oRow => {
                    return checkUserType(oRow.role)
                },
                sortable: true,
            },
        ];

        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <DataTable
                                columns={oColumns}
                                data={oData}
                                pagination={true}
                                striped
                                keyField='_id'
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    const checkUserType = (iRole) => {
        const aRole = {
            2 : 'Personal',
            3 : 'Corporate',
            4 : 'Wholesaler'
        };
        return aRole[iRole];
    }

    return (
        <DashboardLayout
            name='User Applications'
            detail='All Applications'
        >
            {showWholesalers()}
        </DashboardLayout>
    );
};

export default Wholesalers;
