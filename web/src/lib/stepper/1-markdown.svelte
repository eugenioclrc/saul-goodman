<script>
  import 'bytemd/dist/index.css'
  
  import '../../markdown.css';

  import { Editor, Viewer } from 'bytemd'
  import gfm from '@bytemd/plugin-gfm'

	import { createEventDispatcher } from 'svelte';

  
  let value
  const plugins = [
    gfm(),
    // Add more plugins here
  ]
  
  function handleChange(e) {
    value = e.detail.value
  }
  
  const dispatch = createEventDispatcher();
  function onSubmit() {
    dispatch('message', {value});
  }

</script>

      
<p class="pt-2 pb-4">Escribe el contrato, recuerda que cualquiera podra leerlo. <br/>
El mejor caso de uso es para publicar terminos y condiciones o clausulas generales.</p>
<div class="text-left">
  <Editor {value} {plugins} on:change={handleChange} />
</div>
<button class="btn btn-primary mt-6" on:click={onSubmit}>Publicar en IPFS</button>
