import AddGame from "../components/AddGame";
import Airtable from "airtable";

export const getServerSideProps = async() => {
  // get token from airtable
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);
  const records = await base('token').select().all();
  
  const token = records.length ? records[0].get("Token") : "";

  return {
    props: {token: token}
  }
}

export default AddGame;