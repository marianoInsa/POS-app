<script>
  import { onMount } from "svelte";

  let productos = [];

  const host = import.meta.env.VITE_HOST || 'http://localhost';
  const port = import.meta.env.VITE_PORT || '3000';

  onMount(async () => { 
    const response = await fetch(`${host}:${port}/api/productos`);
        if (response.ok) {
            productos = await response.json();
        } else {
            console.error('Error fetching:', response.statusText);
        }
  });
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