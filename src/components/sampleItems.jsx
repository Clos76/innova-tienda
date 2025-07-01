
import { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore' //addDoc to upload individually

function BulkUploader() {
    const [isUploading, setIsUploading] = useState(false);

    const uploadItems = async () => {
        setIsUploading(true);

        const sampleItems = [
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."
            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."
            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."
            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."
            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            }, {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."
            }, {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },
            {
                nombre: "Vestido rojo elegante",
                precio: 1299,
                categoria: "vestidos",
                diseñador: "Maria Lopez",
                imagenes: [
                    "https://images.pexels.com/photos/27430150/pexels-photo-27430150.jpeg",
                    "https://images.pexels.com/photos/3077462/pexels-photo-3077462.jpeg",
                    "https://images.pexels.com/photos/27064278/pexels-photo-27064278.jpeg",
                    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                ],
                descripcion: "Vestido lardo para gala con tela satinada."

            },


        ];

        try {
            const productsRef = collection(db, "productos");
            for (const item of sampleItems) {
                await addDoc(productsRef, item);
                console.log("Item added:", item.nombre);
            }
            alert("Items uploaded successfully!");

        } catch (error) {
            console.error("X Error uploading items:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // return (
    //     <div className="p-4">

    //         <button onClick={uploadItems} disabled={isUploading}>
    //             {isUploading ? "Uploading..." : "Upload Items to Firestore "}

    //         </button>
    //     </div>
    // );




}

export default BulkUploader;
