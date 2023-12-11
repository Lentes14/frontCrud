console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
const {
    createApp
} = Vue
createApp({
    data() {
        return {
            id:0,
            nombre:"",
            descripcion:"",
            imagen:"",
            precio:0,
            cantidad:0,

            //url:'http://127.0.0.1:5000/productos/' + id, //ruta local
            url: 'https://lentes14.pythonanywhere.com//productos' + id, //ruta pythonanywhere
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre  = data.nombre
                    this.descripcion = data.descripcion
                    this.imagen = data.imagen
                    this.precio = data.precio
                    this.cantidad = data.cantidad
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                imagen: this.imagen,
                precio: this.precio,
                cantidad: this.cantidad
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function() {
                    alert("Registro modificado")
                    // window.location.href = "./productos.html";
                    window.location.href = "../pages/controlPanel.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')