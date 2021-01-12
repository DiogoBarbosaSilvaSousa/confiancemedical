import React from 'react';
import { Grid, Typography, Container, Link} from '@material-ui/core';
import '../css/Sugestao.css';
import * as Constante from '../Constantes.js';

export default function Sugestao({sistemaSugestao}) {

    return (
        <section id="sugestao">

            <Container maxWidth="lg" className="conteudo">


                <Grid container spacing={0} className="sistema" >


                    <Grid item xs={6} md={6} className="imagem">
                            <div className="sistema-sugerido-imagem" style={{textAlign:'center',position:'relative',height:'568px'}}>
                                    <div className="imagem-auxiliar-posicao-1">
                                        <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/logo-fundo.jpg" } alt="Logo Fundo" className="tamanho-maximo logo-fundo" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-2">
                                        <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/estante_transparente.png" } alt="Estante" className="tamanho-maximo" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-3">
                                        <img src={ sistemaSugestao.imagem_monitor } alt="Monitor" className="tamanho-maximo monitor" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-4">
                                        <img src={ sistemaSugestao.imagem_insuflador } alt="Insuflador" className="tamanho-maximo insuflador" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-5">
                                        <img src={ sistemaSugestao.imagem_camera } alt="Camera" className="tamanho-maximo camera" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-6">
                                        <img src={ sistemaSugestao.imagem_luz } alt="Luz" className="tamanho-maximo luz" />
                                    </div>

                                    <div className="imagem-auxiliar-posicao-7">
                                        <img src={ sistemaSugestao.imagem_gravador } alt="Gravador" className="tamanho-maximo gravador" />
                                    </div>
                            </div>
                    </Grid>
                    <Grid item xs={6} md={6} className="texto">
                      <div className="sistema-sugerido-texto" style={{position:'relative',height:'568px'}}>

                        <div className="texto-auxiliar-posicao-1">
                            <Typography variant="h5" component="h5" className="titulo-sistema">{sistemaSugestao.sistema}</Typography>
                        </div>

                        <div className="texto-auxiliar-posicao-2">
                              <Typography variant="body1" gutterBottom className="ajuda">&nbsp;</Typography>
                        </div>

                        <div className="texto-auxiliar-posicao-3">
                              <Typography variant="body1" gutterBottom className="auxiliar monitor">Monitor de Grau Médico</Typography>                     
                              <Typography variant="h5" component="h5" className="destaque">{sistemaSugestao.monitor}</Typography>
                              <div className="linha-destaque" style={{width:'522px',maxWidth:'650px',position:'absolute',top:'80px',right:'0'}}></div>
                        </div>

                        <div className="texto-auxiliar-posicao-4">
                            <Typography variant="body1" gutterBottom className="auxiliar insuflador">Insuflador</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaSugestao.insuflador}</Typography>
                            <div className="linha-destaque" style={{width:'566px',maxWidth:'650px',position:'absolute',top:'90px',right:'0'}}></div>
                        </div>

                        <div className="texto-auxiliar-posicao-5">
                            <Typography variant="body1" gutterBottom className="auxiliar camera">Microcâmera</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaSugestao.camera}</Typography>
                            <div className="linha-destaque" style={{width:'620px',maxWidth:'650px',position:'absolute',top:'65px',right:'0'}}></div>
                        </div>   

                        <div className="texto-auxiliar-posicao-6">
                            <Typography variant="body1" gutterBottom className="auxiliar luz">Fonte de Luz</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaSugestao.luz}</Typography>
                            <div className="linha-destaque" style={{width:'466px',maxWidth:'650px',position:'absolute',top:'60px',right:'0'}}></div>
                        </div>

                        <div className="texto-auxiliar-posicao-7">
                            <Typography variant="body1" gutterBottom className="auxiliar gravador">Gravador</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaSugestao.gravador}</Typography>
                            <div className="linha-destaque" style={{width:'710px',maxWidth:'710px',position:'absolute',top:'65px',right:'0'}}></div>
                        </div>

                        <div className="texto-auxiliar-posicao-8">
                            <Typography variant="h5" component="h5" className="acessorios">{sistemaSugestao.acessorios}</Typography>
                        </div>
                      </div>
                    </Grid>
                </Grid>

            </Container>
        </section>
    );
}