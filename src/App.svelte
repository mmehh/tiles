<script>
  import TileContainer from "./lib/TileContainer.svelte";
  import { Styles, Container, Row, Col, Button, Offcanvas, ListGroup, ListGroupItem, Input, Alert, Navbar, NavbarToggler, NavbarBrand } from "sveltestrap";
  import { sizes, Types } from "./lib/constants.js";
  import { getData } from "./lib/data.js";

  let unique = {}; // every {} is unique, {} === {} evaluates to false
  let isOpen = false;
  let win = false;
  let speech = false;
  let uppercase = false;
  let tileContainer;

  let size = sizes[0];
  let type = Types.Letters;
  const restart = (new_size, new_type) => {
    size = new_size;
    type = new_type;
    isOpen = false;
    win = false;
    tileContainer.reset();
    unique = {};
    tiles = getData(type, size, uppercase);
  };

  const toggle = () => (isOpen = !isOpen);
  const handleWinner = (e) => {
    if (speech) window.speechSynthesis.speak(new SpeechSynthesisUtterance("Congratulations!"));
    win = true;
  };

  $: tiles = getData(type, size, uppercase);
</script>

<main>
  <Styles />
  <Container fluid class="mb-3">
    <Row>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" class="me-auto">Tiles</NavbarBrand>
        <NavbarToggler on:click={toggle} class="me-2" />
      </Navbar>
      <Offcanvas {isOpen} {toggle} header="Tiles" placement="start" class="bg-secondary">
        <ListGroup>
          <ListGroupItem tag="button" action on:click={restart(size, type)} class="fs-5 bg-secondary bg-opacity-25 text-white">New Game</ListGroupItem>
          {#each sizes as s}
            <ListGroupItem tag="button" action on:click={restart(s, type)} class="fs-5 bg-secondary bg-opacity-25 text-white">{s} Tiles</ListGroupItem>
          {/each}
          {#each Object.keys(Types) as tile_type}
            <ListGroupItem tag="button" action on:click={restart(size, Types[tile_type])} class="fs-5 bg-secondary bg-opacity-25 text-white"
              >{tile_type} Tiles</ListGroupItem
            >
          {/each}
        </ListGroup>
        <Input id="c1" class="mt-3 fs-3 text-white" type="switch" label="Speech" bind:checked={speech} />
        <Input id="c2" class="mt-3 fs-3 text-white" type="switch" label="Uppercase" bind:checked={uppercase} />
      </Offcanvas>
    </Row>
  </Container>

  <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Alert color="success" isOpen={win} toggle={() => (win = false)}>
          <h1 class="text-center">Congratulations !!!</h1>
          <h4 class="text-center">
            <Button outline info on:click={restart(size, type)}>New Game</Button>
          </h4>
        </Alert>
      </Col>
    </Row>
  </Container>

  {#key unique}
    <TileContainer {tiles} {speech} bind:this={tileContainer} on:winner={handleWinner} />
  {/key}
</main>
