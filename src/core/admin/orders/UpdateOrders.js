import React, { useEffect, useState, Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import oMoment from 'moment';
import { isAuthenticated } from "../../../auth/authUtil";
import { getOrderById, updateOrder } from './ordersApi';
import { getAllShippers } from '../shippers/shippersApi';
import { IMAGE_API } from '../../../config';
import Receipt from '../../../user/Receipt';

const Orders = ({ match }) => {
  const [result, setResult] = useState(false);
    const [selectedShipperSite, setSelectedShipperSite] = useState(false);
    const { sToken, user } = isAuthenticated();
    const [order, setOrder] = useState(false);
    const [shippers, setShippers] = useState(false);
    const [values, setValues] = useState({
        status: 'Processing',
        shipper_id: '',
        shipper_name: '',
        tracking_number: ''
    });
    const { status, shipper_id, tracking_number } = values;
    const loadShipper = () => {
      getAllShippers(user._id, sToken).then(oData => {
          if (oData.error) {
              console.log(oData.error);
          } else {
            setShippers(oData.data);
            loadOrder(oData.data);
          }
      });
    };
    const loadOrder = (oShippers) => {
      getOrderById(user._id, sToken, match.params.orderId).then(oData => {
          if (oData.error) {
              console.log(oData.error);
          } else {
            const oOrder = oData.data;
            setOrder(oOrder);
            /**
             * check shipper first
             */
            if (oOrder.shipper === undefined && oShippers.length > 0) {
              const oDefaultShipper = oShippers.filter(oItem => oItem.shipper_name === 'Basic Shipper');
              oOrder.shipper = {
                _id: oDefaultShipper.length > 0 ? oDefaultShipper[0]._id : oShippers[0]._id,
                shipper_name: oDefaultShipper.length > 0 ?  oDefaultShipper[0].shipper_name : oShippers[0].name,
              };
            }
            setValues({
              shipper_id: oOrder.shipper ? oOrder.shipper._id : '',
              shipper_name: oOrder.shipper ? oOrder.shipper.shipper_name : '',
              status: oOrder.status,
              tracking_number: oOrder.tracking_number
            });
          }
      });
    };

    const getTotal = () => {
      let mTotal = 0;
      order.products.map((oProduct, iIndex) => {
          mTotal += oProduct.price * oProduct.count;
      });

      return mTotal - order.discount_fee;
    };

    const getDiscountFee = () => {
      if (order.discount_fee > 0) {
        return (
          <Fragment>
            <p>Discount Fee: <span>{order.discount_fee}</span></p>
          </Fragment>
        );
      }
    };

    const submitOrder = (oEvent) => {
      oEvent.preventDefault();
      if (window.confirm('Are you sure you want to submit?') === true) {
        if (status === 'Not Processed') {
          alert('Invalid order status');
          return;
        }
        if (status === 'Shipped' && tracking_number.trim() === '') {
          alert('Invalid shipper or tracking number');
          return;
        }
        updateOrder(user._id, sToken, match.params.orderId, values).then(oData => {
          if (oData.error) {
              console.log(oData.error);
          } else {
            alert('Updated Successfully');
            setResult(!result);
          }
        });
      }
    };

    const handleChange = name => oEvent => {
      if (name !== 'shipper_id') {
        setValues({...values, [name]: oEvent.target.value});
      }
      // if shipper then change the selectedShipper web site
      let oShipper = shippers.find(oItem => oItem._id === oEvent.target.value);
      if (oShipper !== undefined) {
        setValues({
          ...values,
          shipper_name: oShipper.shipper_name,
          shipper_id: oShipper._id
        });
        setSelectedShipperSite(oShipper.shipper_website);
      }
    };

    useEffect(() => {
      loadShipper();
    }, [result]);

    const getShipperSite = () => {
      if (selectedShipperSite === false) {
        setSelectedShipperSite(shippers[0].shipper_website);
      }
      return (
        <Fragment>
          <h6>or visit</h6>
          <a href={selectedShipperSite} target='_blank' >{selectedShipperSite}</a>
          <br/>
        </Fragment>
      );
    };

    const showProcessOrder = () => {
      return (
          <Fragment>
            <h5>Order Status:
              <select value={status} onChange={handleChange('status')} id='status' className='btn btn-light border ml-2 mr-2'>
                  <option disabled defaultValue>
                      Mark as
                  </option>
                  <option value='Not Processed'>Not Processed</option>
                  <option value='Processing'>Processing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Delivered'>Delivered</option>
                  <option value='Cancelled'>Cancelled</option>
              </select>
            </h5>
            <h5>Shipper Details</h5>
            <select
              value={shipper_id}
              onChange={handleChange("shipper_id")}
              id='category'
              className='btn btn-light w-25 border mb-2'
            >
                <option disabled>
                  Select Shipper
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
            <input onChange={handleChange("tracking_number")} value={tracking_number} type="text" className="form-control bg-light w-25 small mb-2" placeholder="Tracking Number" />
            {getShipperSite()}
            <button onClick={submitOrder} className="btn btn-primary mt-5">
              Submit
            </button>
          </Fragment>
      );
    };

    const printReceipt = (oEvent) => {
      oEvent.preventDefault();
      var oRestorePage = window.document.body.innerHTML;
      window.document.getElementById('PrintOrder').style.display = '';
      var oPrintContent = window.document.getElementById('PrintOrder').outerHTML;
      window.document.body.innerHTML = oPrintContent;
      window.print();
      window.document.body.innerHTML = oRestorePage;
      window.document.getElementById('SubmitPrint').addEventListener('click', printReceipt);
    };

    const showUpdateOrders = () => {
        return (
            <Fragment>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div>
                      <button id='SubmitPrint' onClick={printReceipt}>Print Receipt</button>
                    </div>
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
                      {order && getDiscountFee()}
                      <p>Total: <span>{order && getTotal()}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    {shippers.length > 0 ? showProcessOrder() : (
                      <h5>No Shipper Available</h5>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row">
                      {order && (
                        <Fragment>
                          <div className="col-sm-6 col-md-6 col-xl-6">
                            <h5>Billing Details</h5>
                            <p>Name: <span>{order.billing[0].name}</span></p>
                            <p>Phone: <span>{order.billing[0].contact}</span></p>
                            <p>Address: <span>{order.billing[0].address}</span></p>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-6">
                            <h5>Shipping Details</h5>
                            <p>Name: <span>{order.shipping[0].name}</span></p>
                            <p>Phone: <span>{order.shipping[0].contact}</span></p>
                            <p>Address: <span>{order.shipping[0].address}</span></p>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <h5>Payment Information</h5>
                    <p>Transaction ID: {order.transaction_id}</p>
                    <p>Payment Reference: {order.reference_number} </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <h5>Order History</h5>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Memo</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              order &&
                              (order.history).map((oElement, iIndex) => {
                                  return (
                                    <tr key={iIndex}>
                                        <td>{oElement.status}</td>
                                        <td>{oElement.note}</td>
                                        <td>{oMoment(oElement.process_time).format('LLL')}</td>
                                    </tr>
                                  )
                              })
                            }
                            </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {order && <div id='PrintOrder' style={{display: 'none'}}>
                <Receipt order={order}/>
              </div>}
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
