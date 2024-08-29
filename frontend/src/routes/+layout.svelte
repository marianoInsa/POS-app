<!-- <script>
    export let data;
</script> -->

<nav>
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/informacion">Información</a></li>
    </ul>
</nav>

<main>
    <slot></slot>
</main>

<footer>
    <p>© 2024 Mariano Insaurralde. Todos los derechos reservados.</p>
    <p>Contacto: mariano@example.com</p>
</footer>

<style>
    nav ul {
        display: flex;
        list-style: none;
        background-color: #333;
        padding: 1rem;
    }

    nav ul li {
        margin-right: 2rem;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    nav ul li a:hover {
        text-decoration: underline;
    }

    footer {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #333;
        color: white;
        text-align: center;
    }
</style>
