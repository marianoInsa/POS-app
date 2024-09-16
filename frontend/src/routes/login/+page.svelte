<script>
  import AuthForm from '../../lib/AuthForm.svelte';
  
  function login(userData) {
    console.log("Datos de inicio de sesion:", userData);
  }
</script>

<AuthForm 
  title="Inicio de Sesion" 
  buttonLabel="Iniciar Sesion"
  onSubmit={login} 
/>