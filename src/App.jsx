
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //use for routes
import { useState } from 'react'
import HeaderTabs from './header'
import './App.css'

//import page components 
import Innovamoda from './pages/Innovamoda';
import Disenadores from './pages/disenadores';
import Inicio from './pages/inicio';
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

import Terminos from './pages/terminos';
import Privacidad from './pages/privacidad';
import Devoluciones from './pages/devoluciones';
import Envios from './pages/envios';
import DesignerProfile from './pages/perfilDisenador';



function App() {

  return (
    //wrap in Router 
    <Router>

      {/*Navigation Header */}
      <HeaderTabs />
      {/**Define the components and path */}

      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/innova-shop" element={<Innovamoda />} />
        {/* <Route path="/disenadores" element={<Disenadores />} />
        <Route path="/colecciones" element={<Colecciones />} /> */}
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

       <Route path="/terminos" element = {<Terminos/>} />
       <Route path="/privacidad" element = {<Privacidad/>} />
       <Route path="/devoluciones" element = {<Devoluciones/>} />
       <Route path="/envios" element = {<Envios/>} />

      <Route path="/designer/:designerId" element={<DesignerProfile/>}/>



      </Routes>

    </Router>

  )
}

export default App

