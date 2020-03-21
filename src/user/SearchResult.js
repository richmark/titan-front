import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import CategorySideList from "./format/category/CategorySideList";
import ProductCard from "./format/product/ProductCard";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Form
} from "react-bootstrap";
import {
  getProductByCategoryAndName
} from "../core/admin/products/productsApi";
import { searchProduct } from "../core/client/productApi";
import { getTotalCount } from "../core/client/cartHelpers";

const SearchResult = ({ match }) => {
  const [iRun, setRun] = useState(getTotalCount());

  const [aCategories, setCategories] = useState([]);
  const [aProducts, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const sId = match.params.queryString;
  const init = () => {
    searchProduct(sId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setProducts(oData.data);
        setSearchedProducts(oData.data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const getCategory = aData => {
    setCategories(aData);
  };

  const handleClickCheckBox = oEvent => {
    var checkedValues = getCheckedValues();

    if (checkedValues.length !== 0) {
      var results = filterByCategory(getCheckedValues());
      setProducts(results);
      return;
    }
    init();
  };

  const filterByCategory = aCheckedValues => {
    var results = [];

    for (var j = 0; j < aCheckedValues.length; j++) {
      for (var i = 0; i < searchedProducts.length; i++) {
        searchedProducts[i].category[0] = searchedProducts[i].category[0] === undefined ? 'combo_deals' : searchedProducts[i].category[0];
        if (
          searchedProducts[i].category[0] === aCheckedValues[j] ||
          searchedProducts[i].category[0]._id === aCheckedValues[j] ||
          searchedProducts[i].brand === aCheckedValues[j]
        ) {
          if (!checkContainsObject(results, searchedProducts[i])) {
            results.push(searchedProducts[i]);
          }
        }
      }
    }

    return results;
  };

  const checkContainsObject = (oList, aInput) => {
    for (var i = 0; i < oList.length; i++) {
      if (oList[i] === aInput) {
        return true;
      }
    }
    return false;
  };
  const getCheckedValues = () => {
    let checkboxElements = document.getElementsByName("categoryCheckbox");
    let checkedArray = [];
    for (var i = 0; i < checkboxElements.length; i++) {
      if (checkboxElements[i].checked) {
        checkedArray.push(checkboxElements[i].value);
      }
    }
    return checkedArray;
  };
  const showCategorySideList = () => {
    return aCategories.map((aCategory, iIndex) => {
      return (
        <Fragment key={iIndex}>
          <Form.Group className="category-side-list mb-0" controlId={iIndex}>
            <Form.Check
              name="categoryCheckbox"
              type="checkbox"
              className="text-uppercase"
              label={aCategory.name}
              value={aCategory._id}
              onClick={handleClickCheckBox}
            />
          </Form.Group>
        </Fragment>
      );
    });
  };

  const showBrandSideList = () => {
    return (
      <Fragment>
        <Form.Group className="category-side-list mb-0" controlId="titan">
          <Form.Check
            name="categoryCheckbox"
            type="checkbox"
            className="text-uppercase"
            label="Titan"
            value="Titan"
            onClick={handleClickCheckBox}
          />
        </Form.Group>
        <Form.Group className="category-side-list mb-0" controlId="yojimbo">
          <Form.Check
            name="categoryCheckbox"
            type="checkbox"
            className="text-uppercase"
            label="Yojimbo"
            value="Yojimbo"
            onClick={handleClickCheckBox}
          />
        </Form.Group>
      </Fragment>
    );
  };

  return (
    <Layout oGetCategory={getCategory} run={iRun} searchPlaceHolder={sId}>
      <Container>
        <Row>
          <Col sm={3}>
            <div className="mb-3">
              <div className="border-bottom border-black mt-5 border"></div>
              <p style={{ color: "black" }} className="mt-1 font-weight-bold">
                Categories
              </p>
              {showCategorySideList()}
              <Form.Group className="category-side-list mb-0" controlId="combo_deals">
              <Form.Check
                name="categoryCheckbox"
                type="checkbox"
                className="text-uppercase"
                label="Combo Deals"
                value="combo_deals"
                onClick={handleClickCheckBox}
              />
            </Form.Group>
              <div className="border-bottom border-black mt-5 border"></div>
            </div>
            <div>
              <p style={{ color: "black" }} className="mt-1 font-weight-bold">
                Brands
              </p>
              {showBrandSideList()}
              <div className="border-bottom border-black mt-5 border"></div>
            </div>
          </Col>
          <Col sm={9}>{ProductCard(aProducts, setRun)}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SearchResult;
