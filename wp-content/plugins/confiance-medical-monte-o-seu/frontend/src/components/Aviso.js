import React from 'react';
import { Grid, Container, Icon } from '@material-ui/core';

import '../css/Aviso.css';

export default function Aviso() {

    return (
        <>
          <section id="aviso">
            <Container maxWidth="lg" className="quadro">
               <div className="fundo-cor"> 
               <Grid container spacing={0} className="linha pt-5">

                    <Grid item xs={2} sm={1} className="info-icone">
                       <Icon className="fas fa-angle-double-right" />
                    </Grid>

                     <Grid item xs={10} sm={10} className="info-texto">
                         Esta configuração poderá sofrer adaptações a depender do orçamento disponível para investimento, das preferências das equipes cirúrgicas em 
                         eventuais acessórios como gravadores de imagem ou 2º monitor cirúrgico. 
                     </Grid>
                </Grid>

                <Grid container spacing={0} className="fundo-cor linha">
                     <Grid item xs={2} sm={1} className="info-icone">
                        <Icon className="fas fa-angle-double-right" />
                    </Grid>
                     <Grid item xs={10} sm={10} className="info-texto">
                          O Confiante responsável pela sua região, fará contato em breve para auxiliá-lo a seguir adiante em sua solicitação. 
                     </Grid>
                 </Grid>

                <Grid container spacing={0} className="fundo-cor linha pb-5">      
                     <Grid item xs={2} sm={1} className="info-icone">
                        <Icon className="fas fa-angle-double-right" />
                    </Grid>
                     <Grid item xs={10} sm={10} className="info-texto">
                         Obrigado por utilizar a ferramenta de configuração. Ela auxiliará nossos consultores a oferecerem tecnologias <br />totalmente alinhadas com suas necessidades. 
                     </Grid>
                </Grid>
                </div>

            </Container>
          </section>
        </>
    );

} // Aviso()