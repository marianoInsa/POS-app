<script>
  import SwitchButton from './SwitchButton.svelte';

  export let title = "Titulo";
  export let buttonLabel = "Boton";
  export let onSubmit;

  let userType = 'Cliente';
  let username = '';
  let password = '';
  let email = '';
  let storeInfo = '';

  function switchUserType(event) {
    // console.log('Cambiando tipo de usuario a:', userType === 'Cliente' ? 'Vendedor' : 'Cliente');
    userType = (userType === 'Cliente' ? 'Vendedor' : 'Cliente');
  }
</script>

<div class="container-auth">
  <div class="form-box">
    <SwitchButton leftLabel="Cliente" rightLabel="Vendedor" on:switch={switchUserType} />

    <h3>{title}</h3>

    <input
      type="text"
      placeholder="Nombre de Usuario"
      bind:value={username}
      required
    />
    
    {#if title === 'Registro de Usuario'}
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        required
      />
    {/if}

    <input
      type="password"
      placeholder="Contraseña"
      bind:value={password}
      required
    />
    
    {#if userType === 'Vendedor' && title === 'Registro de Usuario'}
      <input
        type="text"
        placeholder="Información de Tienda"
        bind:value={storeInfo}
        required
      />
    {/if}
    
    <button on:click={() => onSubmit({ userType, username, password, email, storeInfo })}>
      {buttonLabel}
    </button>
  </div>
</div>

<style>
  .container-auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    padding: 30px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-box input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .form-box button {
    width: 100%;
    padding: 10px;
    background-color: CornflowerBlue;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .form-box button:hover {
    background-color: rgb(53, 118, 239);
  }

  .form-box h3 {
    font-size: 24px;
    text-align: center;
  }
</style>
