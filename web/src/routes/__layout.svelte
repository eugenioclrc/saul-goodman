<script lang="ts">
  import Footer from "$lib/Footer.svelte";
import Header from "$lib/header/Header.svelte";
  import "../app.css";
</script>

<svelte:head>
  <title></title>
  <script src="https://cdn.jsdelivr.net/npm/ipfs-core/dist/index.min.js"></script>
</svelte:head>

<div class="bg-base-100"  style="scroll-behavior: smooth; scroll-padding-top: 5rem;">
  <Header />

  <slot />

  <Footer />

</div>
