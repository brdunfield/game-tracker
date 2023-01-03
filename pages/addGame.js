import AddGame from "../components/AddGame";
import { getToken } from "../lib/util";

export const getServerSideProps = async() => {
  const token = await getToken();

  return {
    props: {token: token}
  }
}

export default AddGame;