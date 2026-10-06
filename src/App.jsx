import { useState } from "react";
import CryptoJS from "crypto-js";

const KEY = import.meta.env.VITE_APP_KEY || "12345678";

const cifrar = (texto) => CryptoJS.AES.encrypt(texto, KEY).toString();

const descifrar = (texto) => {
  const bytes = CryptoJS.AES.decrypt(texto, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default function App() {
  const [plano, setPlano] = useState("");
  const [cifrado, setCifrado] = useState("");
  const [original, setOriginal] = useState("");

  const handleCifrar = () => {
    if (!plano) return;
    setCifrado(cifrar(plano));
    setOriginal("");
  };

  const handleDescifrar = () => {
    if (!cifrado) return;
    setOriginal(descifrar(cifrado));
  };

  return (
    <main className="app">
      <h1>Cifrar y descifrar</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="plano">Texto plano</label>
        <textarea
          id="plano"
          rows={4}
          value={plano}
          onChange={(e) => setPlano(e.target.value)}
          placeholder="Escribe aquí el texto a cifrar"
        />

        <button type="button" onClick={handleCifrar} disabled={!plano}>
          Cifrar
        </button>
        <p className="label">Texto cifrado</p>
        <p id="cifrado" className="salida">{cifrado}</p>

        <button type="button" onClick={handleDescifrar} disabled={!cifrado}>
          Descifrar
        </button>
        <p className="label">Texto original</p>
        <p id="original" className="salida">{original}</p>
      </form>
    </main>
  );
}
