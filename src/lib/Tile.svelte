<script>
  import { createEventDispatcher } from "svelte";
  import { Icon } from "sveltestrap";

  export let item;
  export let speech;
  let flipped = false;
  let visible = true;

  const dispatch = createEventDispatcher();
  const flip = (e) => {
    flipped = !flipped;
    let back_el = e.target.parentElement.lastChild;
    if (speech) window.speechSynthesis.speak(new SpeechSynthesisUtterance(back_el.textContent));
    dispatch("flipped", {
      tile: back_el.textContent,
      id: back_el.id,
    });
  };
  export const unflip = () => (flipped = !flipped);
  export const match = () =>
    setTimeout(() => {
      visible = false;
    }, 1000);
</script>

<main>
  {#if visible}
    <div class:flipped class="card">
      <button class="btn btn-secondary front" on:click={flip} />
      <div class="back fs-1" id={item.id}>
        {#if item.icon}
          <p class="mb-0"><Icon name={item.name.toLowerCase()} /></p>
        {/if}
        <p class="item-name mb-0">{item.name}</p>
      </div>
    </div>
  {/if}
</main>

<style>
  .card {
    position: relative;
    min-height: 150px;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    margin: 1rem;
  }
  .flipped {
    transform: rotateY(180deg);
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .front {
    background-color: #bbb;
    color: black;
  }

  .back {
    background-color: pink;
    color: white;
    transform: rotateY(180deg);
    flex-direction: column;
  }
</style>
