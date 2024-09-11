import { config } from "dotenv";
config();

export async function load({ fetch }) {
  let productos = [];
  try {
    const response = await fetch(`${process.env.PUBLIC_API_URL}/api/productos`);
    if (response.ok) {
      productos = await response.json();
    } else {
      console.error("Error fetching:", response.statusText);
    }

    return { productos };
  } catch (error) {
    console.error("Error en la solucitud: ", error);
    return { productos };
  }
}
