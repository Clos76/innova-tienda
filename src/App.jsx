
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //use for routes
import { useState } from 'react'
import HeaderTabs from './header'
import './App.css'

//import page components 
import Innovamoda from './pages/Innovamoda';
import Disenadores from './pages/disenadores';
import Inicio from './pages/inicio';
import Eventos from './pages/eventos'
import Revista from './pages/revista'
import ProductList from './pages/productList'
import ProductDetail from './pages/productDetails'
import Login from './pages/admin';

import AddProduct from './pages/addProduct';
import ProtectedRoute from './components/protectedRoute';
import AddProductWithImages from './pages/addProductWithImages';
import CartPage from './components/cartPage';
import SuccessPage from './pages/successPage';
import CancelPage from './pages/cancelPage';

import Terminos from './pages/terminos';
import Privacidad from './pages/privacidad';
import Devoluciones from './pages/devoluciones';
import Envios from './pages/envios';
import DesignerProfile from './pages/perfilDisenador';
import Categorias from './components/categorias';

//magazine
import MagazineSection from './components/revista/MagazineColumns';
import MagazineFlip from './components/revista/MagazineReader';
import MagazineSwiper from './components/revista/MagazineSwiper';



function App() {

  return (
    //wrap in Router 
    <Router future={{v7_relativeSplatPath:true, v7_startTransition: true}}>

      {/*Navigation Header */}
      <HeaderTabs />
      {/**Define the components and path */}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/innova-shop" element={<Innovamoda />} />

        {/* <Route path="/disenadores" element={<Disenadores />} />
        
        <Route path="/productos/:categoria" element={<ProductList/>}  />
        <Route path="/upload-temp" element={< BulkUploader />} />
          <Route path="/revista" element={<Revista />} />
        */}

        <Route path="/eventos" element={<Eventos />} />
      


        <Route path="/admin/add-product" element={<ProtectedRoute> <AddProductWithImages /> </ProtectedRoute>} />
        <Route path="/admin" element={<Login />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/devoluciones" element={<Devoluciones />} />
        <Route path="/envios" element={<Envios />} />

        {/** Desinger Routes */}
        <Route path="/designer/:designerId/categories" element={<Categorias />} />
        <Route path="/designer/:designerId/categories/:categoria" element={<ProductList />} />
        <Route path="/producto/:id" element={<ProductDetail />} />

        {/** Magazine Routing */}
          <Route path="/revista" element={<MagazineSection/>}/>
          <Route path='/revista/:slug'  element={<MagazineSwiper/>}/>




      </Routes>

    </Router>

  )
}

export default App

