<script>

  import { ipfs, init }	from '$lib/ipfs.ts';
  import { fade } from 'svelte/transition';
  import Step1Markdown from '$lib/stepper/1-markdown.svelte';
  import { contracts, wrongNetwork, wallet, initMetamask, changeNetwork } from '$lib/eth';
 

  let step = 1;
  let loading = false;
  let ipfsCid;

  
  async function publishContract({ detail: { value } }) {
    if(!value) {
      alert('Escribi algo!');
      return;
    }
    step = 2;
    loading = true;
    await init();
    // const data = await $ipfs.id();
		// data.id;
		// data.agentVersion;
		// // Set successful status text.
		// online = $ipfs.isOnline();
    
    const file = {
      content: value
		};
    
		const result = await $ipfs.add(file);
		ipfsCid = result.cid;
		console.info(result)
    loading = false;
  }

  async function mint() {
    

    await init();
    // const data = await $ipfs.id();
		// data.id;
		// data.agentVersion;
		// // Set successful status text.
		// online = $ipfs.isOnline();
    
        
		const result = await $ipfs.add({ content: JSON.stringify({
        /// "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
        "external_url": ipfsCid, 
        // "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
        "name": "Contrato",
        // "attributes": [ ... ], 
      }) 
    });
		
    const tx = await contracts.contractSaulgoodman.mint(result.cid);
    await tx.wait();
    alert("contrato minteado")

  }

  async function onSubmit() {
    try {
      await window.ethereum.enable();
      await initMetamask();
      step = 4;
      await initMetamask();
    } catch(err) {

    }
    if($wallet) {
      step = 4;
    } else {
      step = 3;
    }
  }

  async function login() {
    try {
      await window.ethereum.enable();
      await initMetamask();
      step = 4;
    } catch (err) {}
  }

</script>

      
<div class="hero min-h-screen bg-neutral text-neutral-content -mt-[4rem] z-10">
  <div class="hero-content mx-auto w-full md:w10/12 text-center ">
    <div class="w-full">
      
      <h2 class="mt-20 mb-2 text-2xl font-extrabold md:text-6xl">Creacion un contrato publico</h2>
      
      <ul class="steps my-3">
        <li class="step" class:step-secondary={step > 0}> <span class:hidden={step !== 1}>Escribe el contrato</span></li>
        <li class="step" class:step-secondary={step > 1}> <span class:hidden={step !== 2}>Check IPFS link</span></li>
        <li class="step" class:step-secondary={step > 2}> <span class:hidden={step !== 3}>Conectar metamask</span></li>
        <li class="step" class:step-secondary={step > 3}> <span class:hidden={step !== 4}>Mintear Contrato</span></li>
      </ul>
      
      {#if step == 1}
        <div transition:fade>
          <Step1Markdown on:message={publishContract} />
        </div>
      {:else if step == 2}
        <div transition:fade>
          <div class="mockup-code bg-neutral-focus mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
            <pre>
              {#if loading}
                Cargando contrato en IPFS, espera por favor
              {:else}
                <a href="https://ipfs.io/ipfs/{ipfsCid}" class="hover:underline" target="_blank">https://ipfs.io/ipfs/{ipfsCid}</a>
              {/if}
            </pre>
          </div>
          <div class="divider text-neutral-content text-opacity-30">↓</div>
          <a class="btn btn-secondary mt-6" href="/preview?code={ipfsCid}" target="_blank">PREVIEW</a>
          <button class="btn btn-primary mt-6" on:click={onSubmit}>Continuar conectando metamask</button>
        </div>
      {:else if step == 3}
        <div transition:fade>
          <button class="btn btn-primary mt-6" on:click={login}>Continectar metamask</button>
        </div>
      {:else if step == 4}
        <div transition:fade>
          <button class="btn btn-primary mt-6" on:click={mint}>Mintear</button>
        </div>
      {/if}
    </div>
  </div>
</div>


<!-- Put this part before </body> tag -->
<div class="modal" class:modal-open={$wrongNetwork}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Error, conectate a la testnet mumbai!</h3>
    <p class="py-4">Es muy facil, hace click en el siguiente boton</p>
    <div class="modal-action">
      <button on:click={changeNetwork}  class="btn">Conectar a MUMBAI</button>
    </div>
  </div>
</div>