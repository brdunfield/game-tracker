import Container from "../components/container";

const AddGame = (props) => {
  return (
    <Container title="Add a Game">
      <form method="post">
        <label htmlFor="name">Title:</label>
        <input type="text" id="name" name="name" />
        
        <label htmlFor="platform">Platform:</label>
        <select id="platform" name="platform" >
          <option value="pc">PC</option>
          <option value="switch">Nintendo Switch</option>
          <option value="3ds">Nintendo 3DS</option>
          <option value="ds">Nintendo DS</option>
          <option value="gba">Game Boy Advanced</option>
          <option value="wiiu">Wii U</option>
          <option value="gamecube">Gamecube</option>
          <option value="n64">Nintendo 64</option>
          <option value="wii">Wii</option>
          <option value="ps4">Playstation 4</option>
          <option value="ps3">Playstation 3</option>
          <option value="ps2">Playstation 2</option>
          <option value="ps1">Playstation 1</option>
          <option value="vita">Playstation Vita</option>
          <option value="mobile">Mobile</option>
        </select>
      </form>
    </Container>
  )
};

export default AddGame;