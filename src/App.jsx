
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //use for routes
import { useState } from 'react'
import HeaderTabs from './header'
import './App.css'

//import page components 
import Innovamoda from './pages/Innovamoda';
import Disenadores from './pages/disenadores';
import Patrocinadores from './pages/patrocinadores';
import Colecciones from './pages/colecciones';
import Eventos from './pages/eventos'
import Revista from './pages/revista'
import ProductList from './pages/productList'
import ProductDetail from './pages/productDetails'
import Login from './pages/admin';

import AddProduct from './pages/addProduct';
import ProtectedRoute from './components/protectedRoute';
import BulkUploader from './components/sampleItems';
import AddProductWithImages from './pages/addProductWithImages';
import CartPage from './components/cartPage';
import SuccessPage from './pages/successPage';
import CancelPage from './pages/cancelPage';




function App() {

  return (
    //wrap in Router 
    <Router>

      {/*Navigation Header */}
      <HeaderTabs />
      {/**Define the components and path */}

      <Routes>
        <Route path="/" element={<Innovamoda />} />
        <Route path="/disenadores" element={<Disenadores />} />
        <Route path="/patrocinadores" element={<Patrocinadores />} />
        <Route path="/colecciones" element={<Colecciones />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/revista" element={<Revista />} />
        <Route path="/productos/:categoria" element={<ProductList/>}  /> 
        <Route path="/producto/:id" element={<ProductDetail/>} />
        <Route path="/admin/add-product" element={<ProtectedRoute> <AddProductWithImages/> </ProtectedRoute>} />
        <Route path="/admin" element={<Login/>}  />
        <Route path="/upload-temp" element={< BulkUploader/>}  /> 
        <Route path="/cart" element = {<CartPage/>} />
       <Route path="/success" element = {<SuccessPage/>} />
       <Route path="/cancel" element = {<CancelPage/>} />

      </Routes>

    </Router>

  )
}

export default App

