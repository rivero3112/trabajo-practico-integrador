const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "https://gymfit21.pythonanywhere.com/usuarios",
      usuarios: [],
      error: false,
      cargando: true,
      paginaActual: 1,
      registrosPorPagina: 6,
      busqueda: "", // 🔍 filtro
    };
  },
  created() {
    this.fetchData(this.url);
  },
  computed: {
    usuariosFiltrados() {
      if (!this.busqueda) return this.usuarios;
      const texto = this.busqueda.toLowerCase();
      return this.usuarios.filter(
        (u) =>
          u.nombre.toLowerCase().includes(texto) ||
          u.apellido.toLowerCase().includes(texto) ||
          u.email.toLowerCase().includes(texto)
      );
    },
    usuariosPaginados() {
      const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
      const fin = inicio + this.registrosPorPagina;
      return this.usuariosFiltrados.slice(inicio, fin);
    },
    totalPaginas() {
      return Math.ceil(this.usuariosFiltrados.length / this.registrosPorPagina);
    },
  },
  watch: {
    busqueda() {
      this.paginaActual = 1;
    },
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.usuarios = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(id) {
      if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
      const url = "https://gymfit21.pythonanywhere.com/borrar/" + id;
      fetch(url, { method: "DELETE" })
        .then((res) => res.text())
        .then(() => {
          alert("Eliminado correctamente");
          this.fetchData(this.url);
          if (
            (this.paginaActual - 1) * this.registrosPorPagina >=
            this.usuariosFiltrados.length - 1
          ) {
            this.paginaActual = 1;
          }
        });
    },
    paginaSiguiente() {
      if (this.paginaActual < this.totalPaginas) this.paginaActual++;
    },
    paginaAnterior() {
      if (this.paginaActual > 1) this.paginaActual--;
    },
  },
}).mount("#app");
