import React, { Fragment, useEffect, useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { updateCategory, getCategory } from './categoriesApi';
import { isAuthenticated } from '../../../auth/authUtil';
import { IMAGE_API } from '../../../config';

const Categories = ({ match }) => {
  const { sToken, user } = isAuthenticated();
  const [values, setValues] = useState({
      _id: '',
      name: '',
      category_image: '',
      formData: '',
  });
  const init = () => {
    getCategory(match.params.categoryId).then(oData => {
        if(oData.error) {
            console.log(oData.error)
        } else {
            const {
                _id,
                name,
                category_image
            } = oData.data;
            setValues({
                _id: _id,
                name: name,
                category_image: `${IMAGE_API}/images/categories/${category_image}`,
                formData: new FormData()
            });
        }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const {
    _id,
    name,
    category_image,
    formData } = values;

  const submitCategory = (oEvent) => {
    oEvent.preventDefault();
    updateCategory(user._id, sToken, formData, _id).then(oData => {
        if (oData.error) {
            console.log(oData);
        } else {
            setValues({
                _id: oData.data._id,
                name: oData.data.name,
                category_image: `${IMAGE_API}/images/categories/${oData.data.category_image}`,
                formData: new FormData()
            });
            alert('Product updated successfully');
        }
    })
  };

  const handleChange = (name) => (oEvent) => {
    if (name !== 'category_image') {
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

  const showUpdateCategory = () => {
      return (
          <Fragment>
            <div className="col-md-6 col-sm-6 col-xl-6 mb-6">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-sm-4'>
                            <p>Category name: </p>
                            <p>Thumbnail: </p>
                            <button onClick={submitCategory} className="btn btn-primary">Update</button>
                        </div>
                        <div className='col-sm-8'>
                            <input value={name} onChange={handleChange('name')} type="text" className="form-control bg-light small mb-2" placeholder="Category Name" />
                            <input onChange={handleChange('category_image')} type="file" className="form-control-file" id="exampleFormControlFile1" />
                            <div style={{ width: '150px' }}>
                                <img className='mt-2' src={category_image} style={{width: '100%'}} />
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-8 col-sm-8 col-xl-8 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="float-right mb-2">
                    <button className="btn btn-danger"><i className="fa fa-trash" /> Delete</button>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style={{width: '3%'}}><input type="checkbox" /></th>
                        <th scope="col" style={{width: '10%'}}>Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories && categories.map((oCategory, iIndex) => (
                        <tr key={iIndex}>
                          <th scope="row"><input type="checkbox" /></th>
                          <td><img src={`${IMAGE_API}/images/categories/${oCategory.category_image}`} style={{width: '100%'}} /></td>
                          <td>{oCategory.name}</td>
                          <td>{oCategory.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className=" text-center">
                    <nav aria-label="Page navigation example text-center">
                      <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div> */}
          </Fragment>
        );
  };

  return (
      <DashboardLayout
          name='Product Management'
          detail='Update Category'
      >
          {showUpdateCategory()}
      </DashboardLayout>
  );
}

export default Categories;
