import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signout from "./user/Signout";
import Login from "./user/Login";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import HomePage from "./user/HomePage";
import Menu from "./core/admin/Menu";
import PreRegister from "./user/PreRegister";
import Bundles from "./core/admin/bundles/Bundles";
import AddBundle from "./core/admin/bundles/AddBundle";
import UpdateBundle from "./core/admin/bundles/UpdateBundle";
import Coupons from "./core/admin/coupons/Coupons";
import AddCoupons from "./core/admin/coupons/AddCoupons";
import UpdateCoupon from "./core/admin/coupons/UpdateCoupon";
import Orders from "./core/admin/orders/Orders";
import UpdateOrders from "./core/admin/orders/UpdateOrders";
import Products from "./core/admin/products/Products";
import Reviews from "./core/admin/reviews/Reviews";
import Shippers from "./core/admin/shippers/Shippers";
import UpdateShipper from "./core/admin/shippers/UpdateShipper";
import Wholesalers from "./core/admin/wholesalers/Wholesalers";
import VerifyEmail from "./user/VerifyEmail";
import Profile from "./user/Profile";
import AdminDashboard from "./core/admin/AdminDashboard";
import Categories from "./core/admin/categories/Categories";
import UpdateCategory from "./core/admin/categories/UpdateCategory";
import AddProduct from "./core/admin/products/AddProduct";
import UpdateProduct from "./core/admin/products/UpdateProduct";
import ProductDetails from "./user/ProductDetails";
import Checkout from "./user/Checkout";
import Forbidden from "./user/Forbidden";
import ProductsByCategory from "./user/format/category/ProductsByCategory";
import OrderDetails from "./user/OrderDetails";
import ReviewProduct from "./user/ReviewProduct";
import PaymayaStatus from "./user/PaymentStatus";
import SearchResult from "./user/SearchResult";
import CategoryList from "./user/CategoryList";
import BundleDetails from "./user/BundleDetails";
import AboutUs from "./user/AboutUs";
import AddSubadmin from "./core/admin/subadmins/AddSubadmins";
import Subadmins from "./core/admin/subadmins/SubAdmins";
import ContactUs from "./user/ContactUs";
import ManageLevel from "./core/admin/levels/ManageLevel";
// custom routes
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import ProcessWholesaler from "./core/admin/wholesalers/ProcessWholesaler";
import UploadImage from "./user/UploadImage";
import ReviewedProduct from "./core/admin/reviews/ReviewedProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={PreRegister} />
      <Route path="/signout" exact component={Signout} />
      <Route path="/signup/:roleId" exact component={Signup} />
      <Route path="/forgotPassword" exact component={ForgotPassword} />
      <Route path="/verify/:sToken" exact component={VerifyEmail} />
      <Route path="/" exact component={HomePage} />
      <Route path="/resetPassword/:tokenId" exact component={ResetPassword} />
      <Route
        path="/product/details/:productId"
        exact
        component={ProductDetails}
      />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/forbidden" exact component={Forbidden} />
      <Route
        path="/categories/:categoryId"
        exact
        component={ProductsByCategory}
      />
      <Route path="/order/detail/:orderId" exact component={OrderDetails} />
      <Route
        path="/product/review/:orderId/:productId"
        exact
        component={ReviewProduct}
      />
      <Route
        path="/payment/paymaya/:userId/:sRequestId/:status"
        exact
        component={PaymayaStatus}
      />
      <Route
        path="/search/result/:queryString"
        exact
        component={SearchResult}
      />

      <Route path="/search/result" exact component={SearchResult} />
      <Route path="/categories/list/show" exact component={CategoryList} />
      <Route path="/bundle" exact component={BundleDetails} />
      <Route path="/about-us" exact component={AboutUs} />
      <Route path="/contact-us" exact component={ContactUs} />
      {/* Private Routes */}
      <PrivateRoute path="/profile/:userId" exact component={Profile} />
      <PrivateRoute path="/upload" exact component={UploadImage} />
      {/* Menu Tabs */}
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoute path="/admin/shippers" exact component={Shippers} />
      <AdminRoute
        path="/admin/shippers/:shipperId"
        exact
        component={UpdateShipper}
      />
      <AdminRoute path="/admin/bundles" exact component={Bundles} />
      <AdminRoute path="/admin/bundles/add" exact component={AddBundle} />
      <AdminRoute
        path="/admin/bundles/update/:bundleId"
        exact
        component={UpdateBundle}
      />
      <AdminRoute path="/admin/coupons" exact component={Coupons} />
      <AdminRoute
        path="/admin/coupons/update/:couponId"
        exact
        component={UpdateCoupon}
      />
      <AdminRoute path="/admin/coupons/add" exact component={AddCoupons} />
      <AdminRoute path="/admin/orders" exact component={Orders} />
      <AdminRoute
        path="/admin/orders/:orderId"
        exact
        component={UpdateOrders}
      />
      <AdminRoute path="/admin/products" exact component={Products} />
      <AdminRoute path="/admin/categories" exact component={Categories} />
      <AdminRoute
        path="/admin/categories/update/:categoryId"
        exact
        component={UpdateCategory}
      />
      <AdminRoute path="/admin/reviews" exact component={Reviews} />
      <AdminRoute
        path="/admin/reviews/:productId"
        exact
        component={ReviewedProduct}
      />
      <AdminRoute path="/admin/products/add" exact component={AddProduct} />
      <AdminRoute path="/admin/wholesalers" exact component={Wholesalers} />
      <AdminRoute
        path="/admin/wholesalers/:wholesalerId"
        exact
        component={ProcessWholesaler}
      />
      <AdminRoute
        path="/admin/products/update/:productId"
        exact
        component={UpdateProduct}
      />
      <AdminRoute path="/admin/subadmin/add" exact component={AddSubadmin} />
      <AdminRoute path="/admin/subadmin" exact component={Subadmins} />
      <AdminRoute path="/admin/levels" exact component={ManageLevel} />
    </BrowserRouter>
  );
};

export default Routes;
