import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import '../css/Configuracao.css';
import api from '../services/api.js';
import * as Constante from '../Constantes.js';



export default function Configuracao({aoEnviarSugestao, aoEnviarPersonalizado}) {


  const [especialidade, setEspecialidade] = useState({
    geral: false,
    ginecologia: false,
    urologia: false,
    proctologia: false,
    ortopedia: false,
    otorrinolaringologia: false,
    oncologia: false,
  });

  const handleEspecialidade = (event) => {
    setEspecialidade({ ...especialidade, [event.target.name]: event.target.checked });
  };

  const [procedimento, setProcedimento] = useState({
    diagnostica: false,
    apendicectomia: false,
    colecistectomia: false,
    herniaUmbilical: false,
    herniaHiato: false,
    gastroplastia: false,
    pancreatectomia: false,
    hepatectomia: false,
    histeroscopiaDiag: false,
    histeroscopiaCiru: false,
    miomaUterino: false,
    endometriose: false,
    rtu: false,
    pieloplastia: false,
    nefrectomia: false,
    adrenalectomia : false,
    prostatectomia : false,
    retossigmoidoscopia : false,
    colectomia : false,
    artroscopia : false,
    otorrinoDiagnostica : false,
    adenoidectomia : false,
    septoplastia : false,
    hipofise : false,
    oncologiaTodas : false,
  });

  const handleProcedimento = (event) => {
    setProcedimento({ ...procedimento, [event.target.name]: event.target.checked });
  };


  function sistema() {

    let sistema = 4;

    // Ginecologia
    // Sistema 1
    if(procedimento.histeroscopiaDiag == true ) {

      sistema = 1;

    }

    // Urologia
    // Sistema 1
    if(procedimento.rtu == true ) {

      sistema = 1;

    }

    // Proctologia
    // Sistema 1
    if(procedimento.retossigmoidoscopia == true ) {

      sistema = 1;

    }

    // Ortopedia
    // Sistema 1
    if(procedimento.artroscopia == true ) {

      sistema = 1;

    }

    // Ortorrinolaringologia
    // Sistema 1
    if(procedimento.otorrinoDiagnostica == true ) {

      sistema = 1;

    }

    // Ginecologia
    // Sistema 2
    if(procedimento.histeroscopiaCiru == true ) {

      sistema = 2;

    }

    // Cirugia Geral
    // Sistema 2
    if(procedimento.diagnostica == true || 
       procedimento.apendicectomia == true || 
       procedimento.colecistectomia == true ) {

       sistema = 2;

    }

    // Cirugia Geral
    // Sistema 3 
    if(procedimento.herniaUmbilical == true || 
       procedimento.herniaHiato == true || 
       procedimento.gastroplastia == true || 
       procedimento.pancreatectomia == true) {
      
        sistema = 3;

    }


    // Ginecologia
    // Sistema 3
    if(procedimento.miomaUterino == true ) {

      sistema = 3;

    }

    // Urologia
    // Sistema 3
    if(procedimento.pieloplastia == true || 
       procedimento.nefrectomia == true ) {

       sistema = 3;


    }


    // Ortorrinolaringologia
    // Sistema 3
    if(procedimento.adenoidectomia == true ) {

      sistema = 3;

    }

    // Ortorrinolaringologia
    // Sistema 3
    if(procedimento.septoplastia == true ) {

      sistema = 3;

    }

    // Cirugia Geral
    // Sistema 4
    if(procedimento.hepatectomia == true) {
 
      sistema = 4;

    }


     // Ginecologia
    // Sistema 4
    if(procedimento.endometriose == true ) {

      sistema = 4;

    }

    // Urologia
    // Sistema 4
    if(procedimento.prostatectomia == true ) {

      sistema = 4;

    }

    // Proctologia
    // Sistema 4
    if(procedimento.colectomia == true ) {

      sistema = 4;

    }

    // Ortorrinolaringologia
    // Sistema 4
    if(procedimento.hipofise == true ) {

      sistema = 4;

    }

    // Oncologia
    // Sistema 4
    if(procedimento.oncologiaTodas == true ) {

      sistema = 4;

    }

     return sistema;

  }

  const estiloSecao = {
    backgroundImage: 'url(' + Constante.BASE_URL_CONF_REACT + '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/fundo_pre_configuracao_v3.png)',
  };

  return (
    <section id="pre-configuracao" style={estiloSecao} >

      <form onSubmit={(event) => {
        event.preventDefault();

        api.get('',{params:{action:"listar_sistemas"}})
           .then((response) => { 
              let num = sistema();
              aoEnviarSugestao(response.data[num]);
              console.log(response.data[num]);
           });

      }}>

        <Container maxWidth="lg">

          <Grid container spacing={0}>

            <Grid item xs={12}>
              <Typography variant="h3" component="h3" className="titulo">PRÉ-CONFIGURAÇÃO</Typography>
              <Typography variant="body1" gutterBottom className="subtexto">Preencha abaixo para receber uma sugestão personalizada.</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h5" component="h5" className="subtitulo">ESPECIALIDADES</Typography>
              <Typography variant="body1" gutterBottom className="subtexto">que utilizarão o equipamento</Typography>

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.geral}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="geral"
                  name="geral"
                  inputProps={{ 'aria-label': 'geral checkbox' }}
                />}
                label="Cirurgia Geral"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.ginecologia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="ginecologia"
                  name="ginecologia"
                  inputProps={{ 'aria-label': 'ginecologia checkbox' }}
                />}
                label="Ginecologia"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.urologia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="urologia"
                  name="urologia"
                  inputProps={{ 'aria-label': 'urologia checkbox' }}
                />}
                label="Urologia"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.proctologia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="proctologia"
                  name="proctologia"
                  inputProps={{ 'aria-label': 'proctologia checkbox' }}
                />}
                label="Proctologia"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.ortopedia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="ortopedia"
                  name="ortopedia"
                  inputProps={{ 'aria-label': 'ortopedia checkbox' }}
                />}
                label="Ortopedia"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.otorrinolaringologia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="otorrinolaringologia"
                  name="otorrinolaringologia"
                  inputProps={{ 'aria-label': 'otorrinolaringologia checkbox' }}
                />}
                label="Otorrinolaringologia"
                className="item-especialidade"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={especialidade.oncologia}
                  onChange={handleEspecialidade}
                  color="primary"
                  value="oncologia"
                  name="oncologia"
                  inputProps={{ 'aria-label': 'oncologia checkbox' }}
                />}
                label="Oncologia"
                className="item-especialidade"
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h5" component="h5" className="subtitulo">PROCEDIMENTOS</Typography>
              <Typography variant="body1" gutterBottom className="subtexto">que serão realizados</Typography>


           { especialidade.geral &&
            <>
              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.diagnostica}
                  onChange={handleProcedimento}
                  color="primary"
                  value="diagnostica"
                  name="diagnostica"
                  inputProps={{ 'aria-label': 'diagnostica checkbox' }}
                />}
                label="Diagnóstica"
                className="item-procedimento"
              />
              <br />
              

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.apendicectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="apendicectomia"
                  name="apendicectomia"
                  inputProps={{ 'aria-label': 'apendicectomia checkbox' }}
                />}
                label="Apendicectomia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.colecistectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="colecistectomia"
                  name="colecistectomia"
                  inputProps={{ 'aria-label': 'colecistectomia checkbox' }}
                />}
                label="Colecistectomia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.herniaUmbilical}
                  onChange={handleProcedimento}
                  color="primary"
                  value="herniaUmbilical"
                  name="herniaUmbilical"
                  inputProps={{ 'aria-label': 'herniaUmbilical checkbox' }}
                />}
                label="Hérnia Umbilical/Inguinal"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.herniaHiato}
                  onChange={handleProcedimento}
                  color="primary"
                  value="herniaHiato"
                  name="herniaHiato"
                  inputProps={{ 'aria-label': 'herniaHiato checkbox' }}
                />}
                label="Hérnia Hiato"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.gastroplastia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="gastroplastia"
                  name="gastroplastia"
                  inputProps={{ 'aria-label': 'gastroplastia checkbox' }}
                />}
                label="Gastroplastia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.pancreatectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="pancreatectomia"
                  name="pancreatectomia"
                  inputProps={{ 'aria-label': 'pancreatectomia checkbox' }}
                />}
                label="Pancreatectomia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.hepatectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="hepatectomia"
                  name="hepatectomia"
                  inputProps={{ 'aria-label': 'hepatectomia checkbox' }}
                />}
                label="Hepatectomia"
                className="item-procedimento"
              />

              <br />
             
              </>
             /* especialidade.geral */  }

            { especialidade.ginecologia &&
            <>
              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.histeroscopiaDiag}
                  onChange={handleProcedimento}
                  color="primary"
                  value="histeroscopiaDiag"
                  name="histeroscopiaDiag"
                  inputProps={{ 'aria-label': 'histeroscopiaDiag checkbox' }}
                />}
                label="Histeroscopia Diagnóstica"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.histeroscopiaCiru}
                  onChange={handleProcedimento}
                  color="primary"
                  value="histeroscopiaCiru"
                  name="histeroscopiaCiru"
                  inputProps={{ 'aria-label': 'histeroscopiaCiru checkbox' }}
                />}
                label="Histeroscopia Cirúrgica"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.miomaUterino}
                  onChange={handleProcedimento}
                  color="primary"
                  value="miomaUterino"
                  name="miomaUterino"
                  inputProps={{ 'aria-label': 'miomaUterino checkbox' }}
                />}
                label="Mioma Uterino"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.endometriose}
                  onChange={handleProcedimento}
                  color="primary"
                  value="endometriose"
                  name="endometriose"
                  inputProps={{ 'aria-label': 'endometriose checkbox' }}
                />}
                label="Endometriose"
                className="item-procedimento"
              />

              <br />

              </>
             /* especialidade.ginecologia */  }

             { especialidade.urologia &&
              <>
              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.rtu}
                  onChange={handleProcedimento}
                  color="primary"
                  value="rtu"
                  name="rtu"
                  inputProps={{ 'aria-label': 'rtu checkbox' }}
                />}
                label="RTU"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.pieloplastia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="pieloplastia"
                  name="pieloplastia"
                  inputProps={{ 'aria-label': 'pieloplastia checkbox' }}
                />}
                label="Pieloplastia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.nefrectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="nefrectomia"
                  name="nefrectomia"
                  inputProps={{ 'aria-label': 'nefrectomia checkbox' }}
                />}
                label="Nefrectomia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.adrenalectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="adrenalectomia"
                  name="adrenalectomia"
                  inputProps={{ 'aria-label': 'adrenalectomia checkbox' }}
                />}
                label="Adrenalectomia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.prostatectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="prostatectomia"
                  name="prostatectomia"
                  inputProps={{ 'aria-label': 'prostatectomia checkbox' }}
                />}
                label="Prostatectomia"
                className="item-procedimento"
              />

              <br />

              </>
             /* especialidade.urologia */  }


             { especialidade.proctologia &&
              <>

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.retossigmoidoscopia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="retossigmoidoscopia"
                  name="retossigmoidoscopia"
                  inputProps={{ 'aria-label': 'retossigmoidoscopia checkbox' }}
                />}
                label="Retossigmoidoscopia"
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.colectomia}
                  onChange={handleProcedimento}
                  color="primary"
                  value="colectomia"
                  name="colectomia"
                  inputProps={{ 'aria-label': 'colectomia checkbox' }}
                />}
                label="Colectomia"
                className="item-procedimento"
              />

              <br />

              </>
              /* especialidade.proctologia */  }


              { especialidade.ortopedia && 
                <>
                <FormControlLabel
                  control={<Checkbox
                    checked={procedimento.artroscopia }
                    onChange={handleProcedimento}
                    color="primary"
                    value="artroscopia"
                    name="artroscopia"
                    inputProps={{ 'aria-label': 'artroscopia  checkbox' }}
                  />}
                  label="Artroscopia "
                  className="item-procedimento"
                />

                <br />

                </>
              /* especialidade.ortopedia */ }

             { especialidade.otorrinolaringologia && 
                <>
              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.otorrinoDiagnostica }
                  onChange={handleProcedimento}
                  color="primary"
                  value="otorrinoDiagnostica"
                  name="otorrinoDiagnostica"
                  inputProps={{ 'aria-label': 'otorrinoDiagnostica  checkbox' }}
                />}
                label="Otorrino. Diagnóstica "
                className="item-procedimento"
              />

              <br />


              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.adenoidectomia }
                  onChange={handleProcedimento}
                  color="primary"
                  value="adenoidectomia"
                  name="adenoidectomia"
                  inputProps={{ 'aria-label': 'adenoidectomia  checkbox' }}
                />}
                label="Adenoidectomia "
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.septoplastia }
                  onChange={handleProcedimento}
                  color="primary"
                  value="septoplastia"
                  name="septoplastia"
                  inputProps={{ 'aria-label': 'septoplastia  checkbox' }}
                />}
                label="Septoplastia "
                className="item-procedimento"
              />

              <br />

              <FormControlLabel
                control={<Checkbox
                  checked={procedimento.hipofise }
                  onChange={handleProcedimento}
                  color="primary"
                  value="hipofise"
                  name="hipofise"
                  inputProps={{ 'aria-label': 'hipofise  checkbox' }}
                />}
                label="Hipófise"
                className="item-procedimento"
              />

              <br />

              </>
              /* especialidade.otorrinolaringologia */ }

             { especialidade.oncologia && 
               <>
                <FormControlLabel
                  control={<Checkbox
                    checked={procedimento.oncologiaTodas }
                    onChange={handleProcedimento}
                    color="primary"
                    value="oncologiaTodas"
                    name="oncologiaTodas"
                    inputProps={{ 'aria-label': 'oncologiaTodas  checkbox' }}
                  />}
                  label="Todas"
                  className="item-procedimento"
                />

                <br />

                </>
               /* especialidade.oncologia */ }

            </Grid>

          </Grid>

          <Grid container spacing={0}>
             <Grid item xs={12} md={5}>
              <Button type="submit" variant="contained" color="primary" className="botao">
                APLICAR CONFIGURAÇÕES
              </Button>
            </Grid>
          </Grid>

        </Container>

      </form>
    </section>
  );
}