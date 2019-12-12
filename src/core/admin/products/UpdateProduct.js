import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllCategories } from "../../admin/categories/categoriesApi";
import { updateProduct, getProduct } from './productsApi';
import { IMAGE_API } from '../../../config';

const UpdateProduct = ({ match }) => {
    const { sToken, user } = isAuthenticated();
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        product_name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        image: '',
        additional_info: [],
        key: '',
        value: '',
        formData: ''
    });

    const {
        product_name,
        price,
        stock,
        category,
        description,
        image,
        additional_info,
        key,
        value,
        formData,
    } = values;

    const loadCategories = () => {
        getAllCategories().then(oCategories => {
            if (oCategories.error) {
                console.log(oCategories.error);
            } else {
                setCategories(oCategories.data);
            }
        });
    };

    const handleChange = name => oEvent => {
        if (name !== 'image') {
            const value = oEvent.target.value;
            formData.set(name, value);
            setValues({ ...values, [name]: value });
            return;
        }
        let oFile = oEvent.target.files[0];
        if (oFile === undefined) {
            formData.set(name, '');
            setValues({
                ...values,
                image: ''
            });
            return;
        }
        let oReader = new FileReader();
        oReader.onloadend = () => {
            formData.set(name, oFile);
            setValues({
                ...values,
                [name]: oReader.result
            });
        }
        oReader.readAsDataURL(oFile);
    };

    const getParameters = () => {
        if (match.params.productId !== undefined) {
            getProduct(match.params.productId).then(oData => {
                if (oData.error) {
                    console.log(oData.error);
                } else {
                    setValues({
                        key: '',
                        value: '',
                        product_name: oData.data.product_name,
                        price: oData.data.price,
                        category: oData.data.category,
                        stock: oData.data.stock,
                        description: oData.data.description,
                        image: `${IMAGE_API}/images/products/${oData.data.image}`,
                        additional_info: oData.data.additional_info,
                        formData: new FormData()
                    });
                    loadCategories();
                }
            });
        }
    };

    useEffect(() => {
        getParameters();
    }, []);

    const submitProduct = oEvent => {
        oEvent.preventDefault();
        updateProduct(user._id, sToken, formData, match.params.productId).then(oData => {
            if(oData.error) {
                console.log(oData.error);
            } else {
                alert('Product updated successfully');
            }
        });
    };

    const handleAdditionalInfo = () => {
        if (key === '' || value === '') {
            alert('Please fill up additional information completely');
            return;
        }
        additional_info.push({ key, value});
        formData.set('additional_info', JSON.stringify(additional_info));
        setValues({
            ...values,
            additional_info: additional_info,
            key: '',
            value: ''
        });
    };

    const handleDeleteAdditionalInfo = iIndex => oEvent => {
        additional_info.splice(iIndex, 1);
        formData.set('additional_info', JSON.stringify(additional_info));
        setValues({
          ...values,
          additional_info: additional_info
        });
      };

    const showAdditionalInfoForm = (oValue, iIndex) => {
        return (
            <div key={iIndex} className="row">
                <div className="col">
                    <input type="text" className="form-control" value={oValue.key} readOnly />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={oValue.value} readOnly />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={handleDeleteAdditionalInfo(iIndex)}
                >
                    <i className="fa fa-trash" />
                </button>
            </div>
        );
    };

    const showUpdateProductForm = () => {
        return (
            <Fragment>
                <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <input value={product_name} onChange={handleChange('product_name')} type="text" className="form-control bg-light small mb-2" placeholder="Product Name" />
                            <input value={price} onChange={handleChange('price')} type="text" className="form-control bg-light small mb-2" placeholder="Price" />
                            <input value={stock} onChange={handleChange('stock')} type="text" className="form-control bg-light small mb-2" placeholder="Stock" />
                            <select value={category} onChange={handleChange('category')} id="category" className="btn btn-light w-100 border mb-2">
                                <option disabled defaultValue>
                                    No category
                                </option>
                                {
                                    categories &&
                                    categories.map((oCategory, iIndex) => (
                                        <option key={iIndex} value={oCategory._id}>
                                            {oCategory.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <textarea value={description} onChange={handleChange('description')} className="form-control mb-2" id="exampleFormControlTextarea1" rows={3} placeholder="Description" />
                            <div className="border p-3 mb-4">
                                <h6>Image Upload</h6>
                                <input onChange={handleChange('image')} type="file" className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                            <div className="border p-3">
                                <h6>Additional Information</h6>
                                <div className="row">
                                    <div className="col">
                                        <input value={key} onChange={handleChange('key')} type="text" className="form-control" placeholder="Name" />
                                    </div>
                                    <div className="col">
                                        <input value={value} onChange={handleChange('value')} type="text" className="form-control" placeholder="Value" />
                                    </div>
                                    <button onClick={handleAdditionalInfo} type="submit" className="btn btn-primary mb-2 mr-2">+</button>
                                </div>
                                {additional_info.map(showAdditionalInfoForm)}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    const showUpdateProductDetail = () => {
        return (
            <Fragment>
                <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <img src={image} style={{ width: '18vw', height: '30vh' }} />
                                </div>
                                <div className="col-md-6 col-sm-6 mb-4">
                                    <h3>{product_name && product_name || 'Product Name'}</h3>
                                    <h4>Price:<span> {price && price || '0' }</span></h4> 
                                    <h4>Quantity:<span id="qty"> {stock && stock || '0' }</span></h4> 
                                    <h5>Description:</h5>
                                    <p style={{fontSize: '12px'}}>
                                        {
                                            description && description || 
                                            `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat.`
                                        }
                                    </p>
                                </div>
                                <h4>Additional Information</h4>
                                <hr />
                                <table className="table text-center">
                                    <tbody>
                                        {
                                            additional_info.length && 
                                            additional_info.map((oValue, iIndex) => (
                                                <tr key={iIndex}>
                                                    <td>{oValue.key}</td>
                                                    <td>{oValue.value}</td>
                                                </tr>
                                            ))
                                            || (
                                                <tr>
                                                    <td>Name</td>
                                                    <td>Value</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    const showUpdate = () => {
        return (
            <Fragment>
                <button onClick={submitProduct} className="btn btn-primary" style={{ marginBottom: '15px', marginLeft: '15px'}}>Update</button>
            </Fragment>
        );
    };
    
    return (
        <DashboardLayout name="Product Management" detail="Update Product">
            {showUpdateProductForm()}
            {showUpdateProductDetail()}
            {showUpdate()}
        </DashboardLayout>
    );
};

export default UpdateProduct;