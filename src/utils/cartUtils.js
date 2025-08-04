export const addToCart = (dispatch, product, quantity = 1, selectedSize = null, image = null) => {
    dispatch({
        type: "ADD_ITEM",
        payload: {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: quantity,
            talla: selectedSize,
            imagen: image || product.imagenes?.[0] || ''
        }
    });

    
}

