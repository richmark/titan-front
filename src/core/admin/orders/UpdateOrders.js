import React, { useEffect, useState, Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import oMoment from 'moment';
import { isAuthenticated } from "../../../auth/authUtil";
import { getOrderById, updateOrder } from './ordersApi';
import { getAllShippers } from '../shippers/shippersApi';
import { IMAGE_API } from '../../../config';

const Orders = ({ match }) => {

    const { sToken, user } = isAuthenticated();
    const [order, setOrder] = useState(false);
    const [shippers, setShippers] = useState(false);
    const [values, setValues] = useState({
        status: 'Processing',
        category: '',
        tracking_number: ''
    });

    const loadOrder = () => {
        getOrderById(user._id, sToken, match.params.orderId).then(oData => {
            console.log(oData.data);
            if (oData.error) {
                console.log(oData.error);
            } else {
                setOrder(oData.data);
            }
        });
    };

    const loadShipper = () => {
        getAllShippers(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setShippers(oData.data);
                setValues({ ...values, category: oData.data[0]._id });
            }
        });
    };

    const getTotal = () => {
        let mTotal = 0;
        order.products.map((oProduct, iIndex) => {
            mTotal += oProduct.price * oProduct.count;
        })
        return mTotal;
    };

    const submitOrder = (oEvent) => {
        oEvent.preventDefault();
        updateOrder(user._id, sToken, match.params.orderId, values).then(oData => {
            console.log(oData.data);
            if (oData.error) {
                console.log(oData.error);
            } else {
                alert('Updated Successfully')
            }
        });
    };

    const handleChange = name => oEvent => {
        setValues({...values, [name]:oEvent.target.value});
    };

    useEffect(() => {
        loadOrder();
        loadShipper();
    }, []);

    const showUpdateOrders = () => {
        return (
            <Fragment>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="float-right"><span>{order && order.products.length}</span> Items</div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" style={{width: '5%'}}>Thumbnail</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order && order.products.map((oProduct, iIndex) => (
                            <tr key={iIndex}>
                                <td className="text-center">
                                <img
                                    src={`${IMAGE_API}/images/products/${oProduct.image}`}  style={{width: '50%'}} />
                                    {/* <img src="./img/default.PNG" style={{width: '50%'}} /> */}
                                </td>
                                <td>
                                    <Link to={`/admin/products/update/${oProduct._id}`}>
                                        {oProduct.product_name}
                                    </Link>
                                </td>
                                <td>{oProduct.price}</td>
                                <td>{oProduct.count}</td>
                                <td>{oProduct.price * oProduct.count}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="float-right">
                      <p>Total: <span>{order && getTotal()}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <h5>Shipper Details</h5>
                    <select
                        onChange={handleChange("category")}
                        id='category'
                        className='btn btn-light w-25 border mb-2'
                    >
                        <option disabled defaultValue>
                            Select a Shipper
                        </option>
                        {
                            shippers &&
                            shippers.map((oShipper, iIndex) => (
                            <option key={iIndex} value={oShipper._id}>
                                {oShipper.shipper_name}
                            </option>
                            ))
                        }
                    </select>
                    <input onChange={handleChange("tracking_number")} type="text" className="form-control bg-light w-25 small mb-2" placeholder="Tracking Number" />
                    <button onClick={submitOrder} className="btn btn-primary">
                      Process
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-6">
                        <h5>Billing Details</h5>
                        <p>Name: <span>Juan Dela Cruz</span></p>
                        <p>Eemail: <span>juan@gmail.com</span></p>
                        <p>Phone: <span>09123456789</span></p>
                        <p>Address: <span>San Antonio Pasig</span></p>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-6">
                        <h5>Shipping Details</h5>
                        <p>Name: <span>Juan Dela Cruz</span></p>
                        <p>E-mail: <span>juan@gmail.com</span></p>
                        <p>Phone: <span>0921365487</span></p>
                        <p>Address: <span>San Antonio Pasig</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <h5>Payment Information</h5>
                  </div>
                </div>
              </div>
            </Fragment>
          );
    };
    return (
        <DashboardLayout name='Order Management' detail='Update Orders'>
            {showUpdateOrders()}
        </DashboardLayout>
    );
};

export default Orders;
