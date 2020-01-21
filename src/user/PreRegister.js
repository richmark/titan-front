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
                        <p>
                            For personal use (single orders).
                        </p>
                        <Link to="/signup/personal" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '57%'}} block>CLICK HERE</Button>
                        </Link>
                    </div>
                    <div className='col-sm border-right rounded mr-2' style={{backgroundColor: '#ffc044'}}>
                        <h2 className="mt-3">Corporate</h2>
                        <p>
                            For corporations (bulk and single orders)

                            Ready your requirements;
                        </p>
                        <ol>
                            <li>Sample</li>
                            <li>Sample</li>
                            <li>Sample</li>
                        </ol>
                        <Link to="/signup/corporate" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '30%'}} block>CLICK HERE</Button>
                        </Link>
                    </div>
                    <div className='col-sm rounded' style={{backgroundColor: '#ffc044'}}>
                        <h2 className="mt-3">Whole Sale</h2>
                        <p>
                            For Whole Saler account (whole sale and package orders)

                            Ready your requirements;
                        </p>
                        <ol>
                            <li>Sample</li>
                            <li>Sample</li>
                            <li>Sample</li>
                        </ol>
                        <Link to="/signup/wholesaler" style={{ textDecoration: 'none'}}>
                            <Button variant="primary" className="mb-3" type="submit" style={{backgroundColor: 'black', border: '1px solid black', marginTop: '30%'}} block>CLICK HERE</Button>
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
