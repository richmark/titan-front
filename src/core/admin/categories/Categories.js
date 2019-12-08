import React, { Fragment, useEffect, useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { getAllCategories, createCategory } from './categoriesApi';
import { isAuthenticated } from '../../../auth/authUtil';
import { IMAGE_API } from '../../../config';

const Categories = () => {
  const { sToken, user } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: '',
    category_image: '',
    formData: ''
  });
  const [result, setResult] = useState(false);
  const init = () => {
    getAllCategories().then(oData => {
      if(oData.error) {
        console.log(oData.error)
      } else {
        setCategories(oData.data);
        setValues({ formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, [result]);

  const { formData, name, category_image } = values;

  const submitCategory = (oEvent) => {
    oEvent.preventDefault();
    createCategory(user._id, sToken, formData).then(oData => {
        if (oData.error) {
            console.log(oData);
        } else {
          setResult(!result);
          setValues({ name: '', category_image: '' });
        }
    })
  };

  const handleChange = (name) => (oEvent) => {
    const value = name === 'category_image' ? oEvent.target.files[0] : oEvent.target.value;
    formData.set(name, value);
  };

  const showCategories = () => {
      return (
          <Fragment>
            <div className="col-md-4 col-sm-4 col-xl-4 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <input value={name} onChange={handleChange('name')} type="text" className="form-control bg-light small mb-2" placeholder="Category Name" />
                  <div className="border p-3 mb-4">
                    <h6>Thumbnail</h6>
                    <input value={category_image} onChange={handleChange('category_image')} type="file" className="form-control-file" id="exampleFormControlFile1" />
                  </div>
                  <button onClick={submitCategory} className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-8 col-xl-8 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  {/* <div className="float-left"><span>10</span> Items</div> */}
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
            </div>
          </Fragment>
        );
  };

  return (
      <DashboardLayout
          name='Product Management'
          detail='Categories'
      >
          {showCategories()}
      </DashboardLayout>
  );
}

export default Categories;
