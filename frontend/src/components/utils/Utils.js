export function handleToggle(id, setPreguntas, preguntas) {
  setPreguntas(
    preguntas.map((pregunta) => {
      if (pregunta.id === id) {
        return { ...pregunta, abierto: !pregunta.abierto };
      }
      return pregunta;
    })
  );
}