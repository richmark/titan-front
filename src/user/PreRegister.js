import React from 'react';
import { Link} from 'react-router-dom';
import Layout from '../core/Layout';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';

const PreRegister = () => {
    
    const showPreRegisterView = () => {
        return (
            <div className='container mt-5 text-center'>
                <div className='row'>
                    <div className='col-sm border-right rounded mr-2' style={{backgroundColor: '#ffc044'}}>
                        <h2 className="mt-3">Personal</h2>
                        <p className='pt-2'>
                            For consumers who need specific tools for their own personal use and consumption.
                        </p>
                        <Link to="/signup/personal" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '58%'}} block>CLICK HERE</Button>
                        </Link>
                    </div>
                    <div className='col-sm border-right rounded mr-2' style={{backgroundColor: '#ffc044'}}>
                        <h2 className="mt-3">Corporate</h2>
                        <p className='pt-2'>
                            For corporate accounts with orders of at least x (amount in pesos) that require single tools or in volume for their various needs and requirements. Must have the necessary business permits and documents for compliance.
                        </p>
                        <Link to="/signup/corporate" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '30%'}} block>CLICK HERE</Button>
                        </Link>
                    </div>
                    <div className='col-sm border-right rounded mr-2' style={{backgroundColor: '#ffc044'}}>
                        <h2 className="mt-3">Wholesale</h2>
                        <p className='pt-2'>
                            For resellers that use tools for business and reselling opportunities.
                        </p>
                        <Link to="/signup/wholesaler" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '58%'}} block>CLICK HERE</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
    
    return (
        <Layout>
            {showPreRegisterView()}
        </Layout>
    );
};

export default PreRegister;
