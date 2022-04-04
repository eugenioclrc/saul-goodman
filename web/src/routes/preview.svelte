<script>

  import 'bytemd/dist/index.css'
  
  import '../markdown.css';

  import { Viewer } from 'bytemd'
  

  import { ipfs, init }	from '$lib/ipfs.ts';
  import { fade } from 'svelte/transition';
  
  import { onMount } from 'svelte';
  
  import gfm from '@bytemd/plugin-gfm'
  
  let ipfsCid;

  const plugins = [
    gfm(),
    // Add more plugins here
  ]
  

  let content='';

  onMount(async () => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    ipfsCid = params.get('code');
    await init();
    // const data = await $ipfs.id();
		// data.id;
		// data.agentVersion;
		// // Set successful status text.
		// online = $ipfs.isOnline();
    // const file = {
    //   content: value
		// };
    
		// const result = await $ipfs.add(file);
		// ipfsCid = result.cid;
		// console.info(result)
    // loading = false;
//     <div class="text-left">
//   <Viewer {value} {plugins} on:change={handleChange} />
// </div>
    // const output = uint8ArrayConcat(await all(ipfs.cat(cidv0)))
    let chunks = [];
    // const data = await $ipfs.cat('QmUj8e4fgWpF7RT1XXJ1auFhqPaxqURmgZf8KZEeXPa55Y');
    // console.log('Data read back via ipfs.cat:', new TextDecoder().decode(data))
    for await (const chunk of $ipfs.cat('QmUj8e4fgWpF7RT1XXJ1auFhqPaxqURmgZf8KZEeXPa55Y')) {
      chunks.push(chunk);
    }
    
    content = String(chunks);
  })

</script>

      
     
<div class="hero min-h-screen bg-neutral text-neutral-content -mt-[4rem] z-10">
  <div class="hero-content mx-auto w-full md:w10/12 text-center ">
    <div class="w-full">
      
      <h2 class="mt-20 mb-2 text-2xl font-extrabold md:text-6xl">Revision de Markdown</h2>
      <p>
        Url del markdown:<br />
        <a href="https://ipfs.io/ipfs/{ipfsCid}" class="hover:underline" target="_blank">https://ipfs.io/ipfs/{ipfsCid}</a><br />
        <a href="ipfs://{ipfsCid}" class="hover:underline" target="_blank">ipfs://{ipfsCid}</a>
      </p>
      
        <div transition:fade>
          <div class="mockup-code bg-neutral-focus mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
      
            <pre>
              {content}
            </pre>
            
          </div>
          <div class="divider text-neutral-content text-opacity-30">↓</div>  
          <div class="mockup-window p-5 bg-white  mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
            <Viewer value={content} {plugins} />
          </div>
          
        </div>
      
    </div>
  </div>
</div>
