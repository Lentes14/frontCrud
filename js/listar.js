const { createApp } = Vue
    createApp({
        data() {
            return {
                productos: [],
                //url:'http://127.0.0.1:5000/productos', // si el backend esta corriendo local usar localhost 5000
                url:'https://lentes14.pythonanywhere.com//productos', // si ya lo subieron a pythonanywhere
                error: false,
                cargando: true,
                /*atributos para el guardar los valores del formulario */
                id:0,
                nombre:"",
                imagen:"",
                precio:0,
                cantidad:0
            }
            },
            methods: {
                fetchData(url) {
                    fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.productos = data;
                        this.cargando = false
                    })
                    .catch(err => {
                        console.error(err);
                        this.error = true
                    })
            },
            eliminar(producto) {
                const url = this.url + '/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                .then(res => res.json()) // or res.json()
                .then(res => {
                    location.reload();
                })
            },
            grabar() {
                let producto = {
                    nombre: this.isbn,
                    descripcion: this.titulo,
                    imagen: this.imagen,
                    precio: this.precio,
                    cantidad: this.cantidad
                }
                var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow'
                }
                fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../pages/listar.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')