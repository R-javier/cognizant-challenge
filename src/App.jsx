import React, { useState } from "react";
import {
  Stack,
  Text,
  Image,
  Button,
  useToast,
  Divider,
  Input,
} from "@chakra-ui/react";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const toast = useToast();
  const pasos = ["Entrevista Tecnica", "Oferta", "Asignación", "Rechazo"];
  const [candidatos, setCandidatos] = useState([
    {
      nombre: "javi",
      paso: "Entrevista Tecnica",
    },
  ]);
  const [candidatoStatus, setCandidatoStatus] = useState(true);
  const [nombreCandidatos, setNombreCandidatos] = useState("");
  const [comentarios, setComentarios] = useState("");

  function addCandi() {
    setCandidatoStatus(false);
  }
  function handleAddCandidato() {
    if (nombreCandidatos === "" || comentarios === "") {
      toast({
        title: "Agrega un candidato.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setCandidatos((candidatos) => {
        return candidatos.concat({
          nombre: nombreCandidatos,
          comentarios,
          paso: "Entrevista Tecnica",
          id: +new Date(),
        });
      });
      setNombreCandidatos("");
      setComentarios("");
    }
  }

  function handleChangePaso(id, paso) {
    setCandidatos((candidatos) =>
      candidatos.map((candidato) =>
        candidato.id === id ? { ...candidato, paso: pasos[paso] } : candidato
      )
    );
  }

  function handleRemoveCandidato(id) {
    setCandidatos((candidatos) =>
      candidatos.filter((candidato) => candidato.id !== id)
    );
  }
  return (
    <Stack
      className="App"
      direction="row"
      display="flex"
      justifyContent="space-around"
      backgroundColor="white"
      p={12}
    >
      <Stack backgroundColor="#263859" p={5} maxH="330">
        <h1>Entrevista Inicial</h1>
        {candidatos.length < 1 && <Text>No hay candidatos</Text>}
        {candidatoStatus ? (
          <Button colorScheme="red" size="sm" onClick={() => addCandi()}>
            Agregar Candidato
          </Button>
        ) : (
          <Stack>
            <Input
              placeholder="nombre"
              value={nombreCandidatos}
              onChange={(event) => {
                setNombreCandidatos(event.target.value);
              }}
            ></Input>
            <Input
              placeholder="comentario"
              value={comentarios}
              onChange={(event) => {
                setComentarios(event.target.value);
              }}
            ></Input>
            <Stack direction="row">
              <Button colorScheme="red" onClick={() => handleAddCandidato()}>
                Agregar
              </Button>
              <Button colorScheme="red">Cancelar</Button>
            </Stack>
          </Stack>
        )}
      </Stack>
      {pasos.map((paso, index) => (
        <Stack backgroundColor="#263859" p={5} maxH="auto">
          <Stack direction="column">
            <Text>{paso}</Text>
            {candidatos.length < 1 && <Text>No hay candidatos</Text>}
          </Stack>
          {candidatos
            .filter((candidato) => candidato.paso === paso)
            .map((candidato) => (
              <Stack
                backgroundColor="#6b778d"
                color="black"
                p={6}
                borderRadius={5}
                className="columns"
                direction="row"
                display="flex"
                justify="space-around"
              >
                <Stack display="flex" direction="row">
                  <Text>{candidato.nombre}</Text>
                  <Text>{candidato.comentarios}</Text>
                </Stack>
                <Stack direction="row">
                  {index > 0 && (
                    <Button
                      color="#263859"
                      size="sm"
                      onClick={() => handleChangePaso(candidato.id, index - 1)}
                    >{`<`}</Button>
                  )}
                  {index < pasos.length - 1 && (
                    <Button
                      color="#0b121f"
                      size="sm"
                      onClick={() => handleChangePaso(candidato.id, index + 1)}
                    >{`>`}</Button>
                  )}
                  <Button onClick={() => handleRemoveCandidato(candidato.id)}>
                    X
                  </Button>
                </Stack>
              </Stack>
            ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default App;
