import React, { useState } from 'react';
import { Grid, Button, Typography, Link, Radio, RadioGroup, FormControlLabel, FormControl, Select, InputLabel, TextField, Checkbox, Container, InputBase } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Icon} from '@material-ui/core';

import '../css/Orcamento.css';
import * as Constante from '../Constantes.js';

export default function Orcamento({sistemaPersonalizado, sistemaSugestao, sistemaMarcadoEscolhido, sistemaEscolhido}) {

    function bloqueiaRecarremento(event) { 

        return event.preventDefault() 
    
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {

        // Antes de exibir o modal atualizo os valores paara o sistema escolhido
        if(sistemaMarcadoEscolhido.sistema == 'Sistema Personalizado') { sistemaEscolhido(sistemaPersonalizado); } else { sistemaEscolhido(sistemaSugestao); }

        setOpen(true);
      };
  
    const handleClose = () => {
        setOpen(false);
    };

    const [instituicao, setInstituicao] = useState('');

    const handleInstituicao = (event) => {
        setInstituicao(event.target.value);
        
        document.querySelector('#outras_inst').classList.add('oculta');
        if(event.target.value == 'outras') { document.querySelector('#outras_inst').classList.remove('oculta')}
    };


    const [estado, setEstado] = useState('');

    const handleEstado = (event) => {
        setEstado(event.target.value);
    };

    const [interesse, setInteresse] = useState({
        compra: false,
        locacao: false,
    });

    const handleInteresse = (event) => {
        setInteresse({ ...interesse, [event.target.name]: event.target.checked });
    };

    const etapaUm = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 1;

        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`; 
        
        const imagemEtapa = document.querySelector('.etapa-imagem');
    
        imagemEtapa.src = imgUrl;
    
        console.log(numetapa);
        
    };


    const etapaDois = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 2;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;
        const imagemEtapa = document.querySelector('.etapa-imagem');
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;

        let estado = document.getElementById('estadoSelect');
        estado.removeAttribute('disabled');

        let cidade = document.getElementById('cidade');
        cidade.removeAttribute('disabled');

        let btnEtapaDois = document.querySelector('.etapaDois');
        btnEtapaDois.classList.add('oculta');

        let btnEtapaTres = document.querySelector('.etapaTres');
        btnEtapaTres.classList.remove('oculta');

        let etapaInstituicao = document.querySelector('.etapa-instituicao');
        etapaInstituicao.classList.add('oculta_etapa');

        let etapaLocalizacao = document.querySelector('.etapa-localizacao');    
        etapaLocalizacao.classList.remove('oculta_etapa');

        console.log(numetapa);
        
    };

    const etapaTres = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 3;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;         
        const imagemEtapa = document.querySelector('.etapa-imagem');    
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;


        let compra = document.getElementById('compra');
        compra.removeAttribute('disabled');

        let locacao = document.getElementById('locacao');
        locacao.removeAttribute('disabled');

        let btnEtapaTres = document.querySelector('.etapaTres');
        btnEtapaTres.classList.add('oculta');

        let btnEtapaQuatro = document.querySelector('.etapaQuatro');
        btnEtapaQuatro.classList.remove('oculta');

        let etapaLocalizacao = document.querySelector('.etapa-localizacao');    
        etapaLocalizacao.classList.add('oculta_etapa');

        let etapaInteresse = document.querySelector('.etapa-interesse');
        etapaInteresse.classList.remove('oculta_etapa');

        console.log(numetapa);
        
    };

    const etapaQuatro = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 4;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;        
        const imagemEtapa = document.querySelector('.etapa-imagem');    
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;

        let nome = document.getElementById('nome');
        nome.removeAttribute('disabled');
    
        let cpfCnpj = document.getElementById('cpfCnpj');
        cpfCnpj.removeAttribute('disabled');

        let hospitalEmpresa = document.getElementById('hospitalEmpresa');
        hospitalEmpresa.removeAttribute('disabled');

        let cargo = document.getElementById('cargo');
        cargo.removeAttribute('disabled');

        let email = document.getElementById('email');
        email.removeAttribute('disabled');

        let telefone = document.getElementById('telefone');
        telefone.removeAttribute('disabled');

        let btnEtapaQuatro = document.querySelector('.etapaQuatro');
        btnEtapaQuatro.classList.add('oculta');

        let btnEtapaFinal = document.querySelector('.etapaFinal');
        btnEtapaFinal.classList.remove('oculta');

        let etapaInteresse = document.querySelector('.etapa-interesse');
        etapaInteresse.classList.add('oculta_etapa');
        
        let etapaContato = document.querySelector('.etapa-contato');    
        etapaContato.classList.remove('oculta_etapa');

        console.log(numetapa);
        
    };


    const etapaUmVoltar = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 1;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;         
        const imagemEtapa = document.querySelector('.etapa-imagem');    
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;

        let btnEtapaDois = document.querySelector('.etapaDois');
        btnEtapaDois.classList.remove('oculta');

        let btnEtapaTres = document.querySelector('.etapaTres');
        btnEtapaTres.classList.add('oculta');

        let etapaInstituicao = document.querySelector('.etapa-instituicao');
        etapaInstituicao.classList.remove('oculta_etapa');
        
        let etapaLocalizacao = document.querySelector('.etapa-localizacao');
        etapaLocalizacao.classList.add('oculta_etapa');

    };


    const etapaDoisVoltar = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 2;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;         
        const imagemEtapa = document.querySelector('.etapa-imagem');    
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;

        let btnEtapaTres = document.querySelector('.etapaTres');
        btnEtapaTres.classList.remove('oculta');

        let btnEtapaQuatro = document.querySelector('.etapaQuatro');
        btnEtapaQuatro.classList.add('oculta');

        let etapaLocalizacao = document.querySelector('.etapa-localizacao');
        etapaLocalizacao.classList.remove('oculta_etapa');
        
        let etapaInteresse = document.querySelector('.etapa-interesse');
        etapaInteresse.classList.add('oculta_etapa');

    };

    
    const etapaTresVoltar = (event) => {

        bloqueiaRecarremento(event);

        let numetapa = 3;
        const imgUrl = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}.png`;         
        const imagemEtapa = document.querySelector('.etapa-imagem');    
        imagemEtapa.src = imgUrl;

        const imgUrlMobile = `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-${numetapa}-mobile.png`;         
        const imagemEtapaMobile = document.querySelector('.etapa-imagem-mobile');    
        imagemEtapaMobile.src = imgUrlMobile;

        let btnEtapaQuatro = document.querySelector('.etapaQuatro');
        btnEtapaQuatro.classList.remove('oculta');

        let btnEtapaFinal = document.querySelector('.etapaFinal');
        btnEtapaFinal.classList.add('oculta');

        let etapaInteresse = document.querySelector('.etapa-interesse');
        etapaInteresse.classList.remove('oculta_etapa');
        
        let etapaContato = document.querySelector('.etapa-contato');    
        etapaContato.classList.add('oculta_etapa');

    };

    return (

        <section id="orcamento">
            <div style={{position:"relative"}}> 
                <div style={{backgroundColor:"#fff",width:"100%",height:"6px",position:"absolute",top:"-3px"}}>&nbsp;</div> 
            </div>

            <Container maxWidth="lg" className="marcador">
                 <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/marcadores/marcador_orcamento.png" } alt="Marcador Orçamento" className="marcador-orcamento" />
            </Container>

            <Container maxWidth="lg">
                <Typography variant="h4" component="h4" className="titulo">Orçamento para este sistema</Typography>
            </Container>

            <Container maxWidth="lg" className="text-center d-none d-sm-block">              
                <img src={ `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-1.png` } alt="Etapas" className="etapa-imagem" />
            </Container>

            <Container maxWidth="lg" className="text-center p-0 d-block d-sm-none">
                <img src={ `${Constante.BASE_URL_CONF_REACT}/wp-content/plugins/confiance-medical-monte-o-seu/public/images/etapas/etapa-1-mobile.png` } alt="Etapas" className="etapa-imagem-mobile" />
            </Container>

            <Container maxWidth="lg">

                <Grid container spacing={0} className="formulario">
                    <Grid item xs={12} md={3} className="etapa-instituicao">
                       <div className="linha-lateral"> 

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">

                                   <input className="privada" type="radio" name="instituicao" id="privada" value="privada" onChange={handleInstituicao} />

                                   <span className="cr"><i className="cr-icon fa fa-circle"></i></span>

                                   <div className="texto">Privada</div> 

                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">
                                  <input className="publica" type="radio" name="instituicao" id="publica" value="publica" onChange={handleInstituicao} />
                                  
                                  <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                  
                                  <div className="texto">Pública</div> 

                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">
                                    <input className="filantropica" type="radio" name="instituicao" id="filantropica" value="filantropica" onChange={handleInstituicao} />

                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>

                                    <div className="texto">Filantrópica</div> 
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">
                                    <input className="oss" type="radio" name="instituicao" id="oss" value="oss" onChange={handleInstituicao} />

                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>

                                    <div className="texto">OSS</div>
                               </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">
                                    <input className="cirurgiao" type="radio" name="instituicao" id="cirurgiao" value="cirurgiao" onChange={handleInstituicao} />

                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>

                                    <div className="texto">Cirurgião</div>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="radio">
                               <label className="item-procedimento">
                                    <input className="outras" type="radio" name="instituicao" id="outras" value="outras" onChange={handleInstituicao} />

                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    
                                    <div className="texto">Outras</div>
                                </label>
                            </div>
                        </div>

                        <div className="form-group pr-3">
                              <br />                              
                              <input type="text" className="form-control oculta" id="outras_inst" name="outras_inst" placeholder="Outras" />
                        </div>

                          <br />
                          <Button onClick={etapaDois} className="etapaDois" data-etapanumero="2" variant="contained" color="primary">
                                    AVANÇAR
                          </Button>

                       </div>
                          
                    </Grid>

                    <Grid item xs={12} md={3} className="etapa-localizacao oculta_etapa">

                      <div className="linha-lateral">
                            <div className="form-group espacamento">
                                <label htmlFor="estadoSelect">Estado</label>
                                <select className="form-control" id="estadoSelect" disabled>
                                    <option aria-label="None" value="" />
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="SP">São Paulo</option>
                                </select>
                            </div>

                            <div className="form-group espacamento">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" className="form-control" id="cidade" name="cidade" placeholder="Digite a cidade" disabled />
                            </div>

                            <br />
                            <Button onClick={etapaUmVoltar} className="btnVoltarInteresse d-sm-none" data-etapanumero="4" variant="contained" color="primary">
                                     VOLTAR
                             </Button>

                            <Button onClick={etapaTres} className="etapaTres oculta" data-etapanumero="3" variant="contained" color="primary">
                                    AVANÇAR
                            </Button>
                      </div>  

                          

                    </Grid>

                    <Grid item xs={12} md={3} className="etapa-interesse oculta_etapa">

                        <div className="linha-lateral">

                                <br />

                                <div className="form-group">
                                    <div className="checkbox">

                                        <label className="item-procedimento">
                                            <input className="compra" 
                                                type="checkbox" 
                                                id="compra" 
                                                name="compra" 
                                                value="compra" 
                                                onChange={handleInteresse}
                                                checked={interesse.compra}
                                                disabled />
                                            
                                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>

                                            <div className="texto">Compra</div> 
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="checkbox">

                                       <label className="item-procedimento"> 
                                            <input className="locacao" 
                                                type="checkbox" 
                                                id="locacao" 
                                                name="locacao" 
                                                value="locacao" 
                                                onChange={handleInteresse} 
                                                checked={interesse.locacao}                                                
                                                disabled />

                                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>

                                            <div className="texto">Locação</div> 

                                        </label>
                                    </div>
                                </div>

                             <br />
                             <Button onClick={etapaDoisVoltar} className="btnVoltarInteresse d-sm-none" data-etapanumero="4" variant="contained" color="primary">
                                     VOLTAR
                             </Button>

                             <Button onClick={etapaQuatro} className="etapaQuatro oculta" data-etapanumero="4" variant="contained" color="primary">
                                     AVANÇAR
                             </Button>
                        </div>

                          
                    </Grid>


                    <Grid item xs={12} md={3} className="etapa-contato oculta_etapa">

                         <div className="linha-lateral">
                                <div className="form-group espacamento">
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome Completo" disabled />
                                </div>

                                <div className="form-group espacamento">
                                    <label htmlFor="cpfCnpj">CPF/CNPJ</label>
                                    <input type="text" className="form-control" id="cpfCnpj" name="cpfCnpj" placeholder="Digite o número" disabled />
                                </div>

                                <div className="form-group espacamento">
                                    <label htmlFor="hospitalEmpresa">Hospital/Empresa</label>
                                    <input type="text" className="form-control" id="hospitalEmpresa" name="hospitalEmpresa" placeholder="Nome do Hospital ou Empresa" disabled/>
                                </div>

                                <div className="form-group espacamento">
                                    <label htmlFor="cargo">Cargo</label>
                                    <input type="text" className="form-control" id="cargo" name="cargo" placeholder="Cargo do comprador" disabled/>
                                </div>

                                <div className="form-group espacamento">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="nome@email.com.br" disabled/>
                                </div>

                                <div className="form-group espacamento">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input type="text" className="form-control" id="telefone" name="telefone" placeholder="(XX) XXXX-XXXX" disabled/>
                                </div>

                                <br />

                                <Button onClick={etapaTresVoltar} className="btnVoltarInteresse d-sm-none" data-etapanumero="4" variant="contained" color="primary">
                                     VOLTAR
                                </Button>

                                <Button onClick={handleClickOpen} className="etapaFinal oculta" variant="contained" color="primary">
                                    SOLICITAR
                                </Button>
                       </div>
                    </Grid>

                </Grid>

            </Container>

            {adicionaAgradecimento()}

        </section>

    );


/*********************** ******************** ************************/
/*********************** Início Agradecimento ************************/
/*********************** ******************** ************************/

function adicionaAgradecimento() {

    return (

      <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
  >
    <Grid container spacing={0}>

        <Grid item xs={10}>
            <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao">&nbsp;</DialogTitle>
        </Grid>

        <Grid item xs={2}>

          <DialogActions>
            <Link href="#" onClick={handleClose}>
                  <Icon className="fas fa-times orcamento-icone-fechar" />
             </Link>
          </DialogActions>

        </Grid>

    </Grid>

    <DialogContent>

      <Grid container spacing={0} className="orcamento sistema" >

            <Grid item xs={12} md={6} className="imagem">
                    <div className="sistema-personalizado-imagem" style={{textAlign:'center',position:'relative',height:'568px'}}>
                            <div className="posicao-1">
                                <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/logo-fundo.jpg" } alt="Logo Fundo" className="logo-fundo" />
                            </div>

                            <div className="posicao-2">
                                <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/estante_transparente.png" } alt="Estante" style={{maxWidth:"540px"}} />
                            </div>

                            <div className="posicao-3">
                                <img src={ sistemaMarcadoEscolhido.imagem_monitor } alt="Monitor" className="tamanho-maximo" />
                            </div>

                            <div className="posicao-4">
                                <img src={ sistemaMarcadoEscolhido.imagem_insuflador } alt="Insuflador" className="tamanho-maximo" />
                            </div>

                            <div className="posicao-5">
                                <img src={ sistemaMarcadoEscolhido.imagem_camera } alt="Camera" className="tamanho-maximo" />
                            </div>

                            <div className="posicao-6">
                                <img src={ sistemaMarcadoEscolhido.imagem_luz } alt="Luz" className="tamanho-maximo" />
                            </div>

                            <div className="posicao-7">
                                <img src={ sistemaMarcadoEscolhido.imagem_gravador } alt="Gravador" className="tamanho-maximo" />
                            </div>
                    </div>
            </Grid>

            <Grid item xs={12} md={6} className="texto">
                     <div className="sistema-personalizado-texto" style={{position:'relative'}}>

                         <div style={{maxWidth:'650px'}}>
                            <Typography variant="h5" component="h5" className="titulo-agradecimento">Obrigado por configurar seu sistema</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="h5" component="h5" className="titulo-sistema">{sistemaMarcadoEscolhido.sistema}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar monitor">Monitor de Grau Médico</Typography>                     
                            <Typography variant="h5" component="h5" className="destaque">{sistemaMarcadoEscolhido.monitor}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar insuflador">Insuflador</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaMarcadoEscolhido.insuflador}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar camera">Microcâmera</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaMarcadoEscolhido.camera}</Typography>
                        </div>   

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar luz">Fonte de Luz</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaMarcadoEscolhido.luz}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar gravador">Gravador</Typography>
                            <Typography variant="h5" component="h5" className="destaque">{sistemaMarcadoEscolhido.gravador}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="h5" component="h5" className="acessorios">{sistemaMarcadoEscolhido.armario} {sistemaMarcadoEscolhido.acessorios}</Typography>
                        </div>

                        <div style={{maxWidth:'650px'}}>
                            <Typography variant="body1" gutterBottom className="auxiliar">Em caso de dúvidas, fale com o Consultor de sua região:</Typography>
                            <Typography variant="h5" component="h5" className="destaque consultor">FERNANDO BARRETO</Typography>
                            <Typography variant="body1" gutterBottom className="auxiliar"> <Icon className="far fa-envelope icone" /> <span className="texto">fbarreto@email.com.br</span></Typography>
                            <Typography variant="body1" gutterBottom className="auxiliar"> <Icon className="fas fa-phone icone" /> <span className="texto">21 2222-2222</span></Typography>
                        </div>
                    </div>
            </Grid>
       </Grid>


    </DialogContent>
     
  </Dialog>

    );

  } // function adicionaAgradecimento

/*********************** ***************** ************************/
/*********************** Fim Agradecimento ************************/
/*********************** ***************** ************************/

}