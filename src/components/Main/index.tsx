import { Box, Paper, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const Main = () => {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [result, setResult] = useState<any[]>([]);
  const [imc, setImc] = useState(0);
  const [situation, setSituation] = useState("");

  const calculate = useCallback(() => {
    setImc(result[0] / (result[1] * result[1]));

    checkIMC();
  }, [result]);

  const checkIMC = useCallback(() => {
    let imc = result[0] / (result[1] * result[1]);
    if (imc < 18.5) {
      setSituation("Magreza");
    } else if (imc >= 18.5 && imc < 25) {
      setSituation("Normal");
    } else if (imc >= 25 && imc < 30) {
      setSituation("Sobrepeso");
    } else if (imc >= 30 && imc < 40) {
      setSituation("Obesidade");
    } else if (imc >= 40) {
      setSituation("Obesidade Grave!");
    }
  }, [result]);

  useEffect(() => {
    setResult([peso, altura]);
  }, [peso, altura]);

  return (
    <Box>
      <Grid
        style={{ minHeight: "90vh" }}
        alignItems="center"
        justifyContent="center"
        container
        spacing={0}
      >
        <Grid item>
          <Paper elevation={4} sx={{ padding: "50px" }}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography textAlign="center" variant="h6">
                  Calculadora de IMC
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  onChange={(e) => setAltura(parseFloat(e.target.value))}
                  required
                  label="Altura / m"
                />
              </Grid>
              <Grid item>
                <TextField
                  onChange={(e) => setPeso(parseFloat(e.target.value))}
                  required
                  label="Peso / kg"
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  onClick={() => calculate()}
                  variant="contained"
                >
                  Calcular
                </Button>
              </Grid>
              {imc ? (
                <Grid item>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <Grid container spacing={0} direction="column">
                        <Grid item>
                          <Typography variant="body1">Seu IMC:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">{imc}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container spacing={0} direction="column">
                        <Grid item>
                          <Typography variant="body1">Situação:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">{situation}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
