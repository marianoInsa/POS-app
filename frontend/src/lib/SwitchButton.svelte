<script>
  export let leftLabel = "izq";
  export let rightLabel = "der";
  export let state = false;

  // Evento personalizado que se emite cuando se haga el switch
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Funcion que cambia el estado y emite el evento
  function toggle() {
    state = !state;
    dispatch("switch", { state });
  }
</script>

<div class="switch">
  <button class={state ? 'button right' : 'button left'} on:click={toggle}>
    {state ? rightLabel : leftLabel}
  </button>
</div>

<style>
  .switch {
    width: 120px;
    height: 40px;
    background-color: CornflowerBlue;
    border-radius: 10px;
    position: relative;
    user-select: none;
  }
  
  .button {
    cursor: pointer;
    width: 80px;
    height: 40px;
    text-align: center;
    color: black;
    position: absolute;
    transition: all 0.3s ease;
    border-radius: 10px;
  }

  .right {
    right: 0;
  }

  .left {
    left: 0;
  }
</style>