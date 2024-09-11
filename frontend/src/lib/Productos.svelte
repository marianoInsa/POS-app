<script>
  export let data;
  let productos = data.productos;
</script>

<div>
  <h1>Productos Disponibles</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      {#each productos as producto}
      <tr>
        <td>{producto.name}</td>
        <td>${producto.price}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
</style>