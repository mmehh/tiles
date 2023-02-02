<script>
  import Tile from "./Tile.svelte";
  import { Container, Row, Col } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  export let tiles;
  export let speech;

  const dispatch = createEventDispatcher();
  const children = [];
  let matched = 0;
  let first = null;
  const turned = [];
  function handleFlipped(event) {
    if (turned.length === 2) {
      turned.forEach((element) => {
        children[element].unflip();
      });
      reset();
    }
    turned.push(event.detail.id);
    if (first === null) {
      first = event.detail.tile;
    } else if (first === event.detail.tile) {
      turned.forEach((element) => {
        children[element].match();
      });
      matched += 2;
      if (matched == tiles.length) {
        matched = 0;
        setTimeout(() => {
          dispatch("winner", {});
        }, 1000);
      }
    }
  }

  export const reset = () => {
    turned.length = 0;
    first = null;
  };
</script>

<Container>
  <Row>
    {#each tiles as item (item.id)}
      <Col xs="6" sm="3">
        <Tile {item} {speech} on:flipped={handleFlipped} bind:this={children[item.id]} />
      </Col>
    {/each}
  </Row>
</Container>
