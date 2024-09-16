<script>
  import AuthForm from '../../lib/AuthForm.svelte';
  
  function register(userData) {
    console.log("Datos de registro:", userData);
  }
</script>

<AuthForm 
  title="Registro de Usuario" 
  buttonLabel="Registrarse"
  onSubmit={register} 
/>