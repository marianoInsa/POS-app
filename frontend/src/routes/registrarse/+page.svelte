<script>
  import AuthForm from '../../lib/AuthForm.svelte';
  
  function register(userData) {
    console.log("Datos de registro:", userData);
  }
</script>

<!-- <SwitchButton leftLabel="Cliente" rightLabel="Vendedor" on:switch={switchUserType} /> -->

<AuthForm 
  title="Registrarse" 
  buttonLabel="Registrarse"
  onSubmit={register} 
/>