<script>
  import Productos from "../../lib/Productos.svelte";

  export let data;
  
</script>

<section>
    <h1>Productos</h1>
    
    <Productos {data}/>
</section>

<style>
    section {
        padding: 2rem;
        text-align: center;
    }

    h1 {
        margin-bottom: 2rem;
    }
</style>
