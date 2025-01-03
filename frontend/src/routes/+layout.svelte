<div>
  <nav>
        <a href="/">Inicio</a>
        <a href="/login">Iniciar Sesión</a>
        <a href="/productos">Productos</a>
        <a href="/informacion">Información</a>
  </nav>
</div>

<main>
    <slot></slot>
</main>

<footer>
    <p>© 2024 Mariano Insaurralde. Todos los derechos reservados.</p>
    <p>Contacto: mariano@example.com</p>
</footer>

<style>
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #333;
      color: #fff;
      padding: 1rem;
    }
    nav {
      display: flex;
      gap: 0.5rem;
    }

    a {
      width: 100px;
      flex: 1;
      background-color: #666;
      color: #fff;
      border: 1px solid;
      padding: 0.5rem;
      text-align: center;
      text-decoration: none;
      transition: all 0.5s ease-out;
    }

    a:hover,
    a:focus {
      background-color: #fff;
      color: #333;
    }

    main {
        padding: 1rem;
        height: 100vh;
    }

    footer {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #333;
        color: white;
        text-align: center;
    }
</style>
