

function CancelPage(){
    return(
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-500">Pago cancelado</h1>
            <p className="mt-4">Tu orden no fue completada. Puedes intentarlo de nuevo cuando quieras.</p>

              <a
          href="/"
          className="mt-6 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Volver a la tienda
        </a>
        </div>
    );
}

export default CancelPage

