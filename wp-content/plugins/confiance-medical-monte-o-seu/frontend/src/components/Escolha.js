import React from 'react'; 
import { Grid, Typography, Container, Link} from '@material-ui/core';
import * as Constante from '../Constantes.js';
import '../css/Escolha.css';

export default function Escolha({sistemaPersonalizado, sistemaSugestao, sistemaMarcadoEscolhido,sistemaEscolhido}) {

    const preventDefault = (event) => {
        event.preventDefault();

        let marcador = event.target.dataset.nome; 
        
        const marcadorSugestao = document.querySelector('.marcador-sugestao');
        const marcadorMonte = document.querySelector('.marcador-monte');

        const marcadorSugestaoMobile = document.querySelector('.marcador-sugestao-mobile');
        const marcadorMonteMobile = document.querySelector('.marcador-monte-mobile');

        const secaoSugestao = document.querySelector('#sugestao');
        const secaoMonte = document.querySelector('#monte');

        const linkSugestao = document.querySelector('.link-sugestao .titulo');
        const linkMonte = document.querySelector('.link-monte .titulo');
        
        if(marcador == 'sugestao') {

            sistemaEscolhido(sistemaSugestao);

            marcadorSugestao.classList.remove('oculta');
            marcadorMonte.classList.add('oculta');

            marcadorSugestaoMobile.classList.remove('oculta');
            marcadorMonteMobile.classList.add('oculta');

            secaoSugestao.classList.remove('oculta');
            secaoMonte.classList.add('oculta');

            linkSugestao.classList.remove('normal');
            linkMonte.classList.add('normal');
            
        }

        
        if(marcador == 'monte') {

            sistemaEscolhido(sistemaPersonalizado);

            marcadorMonte.classList.remove('oculta');
            marcadorSugestao.classList.add('oculta');

            marcadorMonteMobile.classList.remove('oculta');
            marcadorSugestaoMobile.classList.add('oculta');

            secaoMonte.classList.remove('oculta');
            secaoSugestao.classList.add('oculta');

            linkMonte.classList.remove('normal');
            linkSugestao.classList.add('normal');

        }

        console.log(event.target.dataset.nome);

    };

    return (
        <section id="escolha">
            <Container maxWidth="xl" className="cabecalho">
            
                <Container maxWidth="lg" className="interno">

                    <Grid container spacing={0}>

                        <Grid item xs={6} md={6}>
                        <Link href="#" onClick={preventDefault} className="link-sugestao" data-nome="sugestao"><Typography variant="h3" component="h3" className="titulo" data-nome="sugestao">Nossa Sugestão</Typography></Link>
                        </Grid>

                        <Grid item xs={6} md={6}>
                        <Link href="#" onClick={preventDefault} className="link-monte" data-nome="monte"><Typography variant="h3" component="h3" className="titulo normal" data-nome="monte">Monte o Seu</Typography></Link>
                        </Grid>

                    </Grid>

                </Container>

            </Container>

            <Container maxWidth="xl">
         
                <Container maxWidth="lg" className="interno">
                    
                        <Grid container spacing={0}>

                            <Grid item xs={6} md={6}>
                               <div className="oculta_mobile">
                                  <img src={Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/marcadores/marcador_transparente.png"} alt="Marcador" className="marcador-sugestao" />
                               </div>

                               <div className="oculta_desktop">
                                  <img src={Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/marcadores/marcador_mobile_transparente.png"} alt="Marcador" className="marcador-sugestao-mobile" />
                               </div>
                            </Grid>

                            <Grid item xs={6} md={6}>
                               <div className="oculta_mobile">
                                 <img src={Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/marcadores/marcador_transparente.png"} alt="Marcador" className="marcador-monte oculta"/>
                               </div>

                               <div className="oculta_desktop">
                                 <img src={Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/marcadores/marcador_mobile_transparente.png"} alt="Marcador" className="marcador-monte-mobile oculta"/>
                               </div>
                            </Grid>

                        </Grid>
                    
                </Container>

            </Container>

        </section>
    );

}