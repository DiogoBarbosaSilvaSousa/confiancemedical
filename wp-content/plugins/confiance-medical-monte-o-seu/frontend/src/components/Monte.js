import React, { useState, useEffect } from 'react';
import { Grid, Typography, Icon,Button, Link, Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../services/api.js';
import '../css/Monte.css';
import * as Constante from '../Constantes.js';

export default function Monte({sistemaPersonalizado, aoEnviarPersonalizado}) {

    const [open, setOpen] = useState(false); // Módulos
    const [openMonitores, setOpenMonitores] = useState(false); // Monitores
    const [openInsufladores, setOpenInsufladores] = useState(false); // Insufladores
    const [openCameras, setOpenCameras] = useState(false); // Câmeras
    const [openLuzes, setOpenLuzes] = useState(false); // Luzes
    const [openGravadores, setOpenGravadores] = useState(false); // Gravadores
    const [openArmarios, setOpenArmarios] = useState(false); // Armários
    const [openAcessorios, setOpenAcessorios] = useState(false); // Acessórios


    const preventDefault = (event) => event.preventDefault();
    
    function bloqueiaRecarremento(event) { return event.preventDefault() };



/*********************** **************** ************************/
/*********************** Início Monitores ************************/
/*********************** **************** ************************/

    // Monitores
    const handleClickOpenMonitores = (event) => {
      bloqueiaRecarremento(event);

      setOpenMonitores(true);
    };

    const handleCloseMonitores = (event) => {
      bloqueiaRecarremento(event);

      setOpenMonitores(false);
    };

    /**********************************************/
    /**Monitores (Eventos de inclusão alteração)**/
    /**********************************************/

    const incluirMonitor = (event) => {
      bloqueiaRecarremento(event);

      let id_monitor = event.target.dataset.opcao; // id


      // limpar destaque
      let limpar = document.querySelectorAll('.monitor .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.monitor .opcao-monitor-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_monitor);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_monitor + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_monitor = document.querySelector("#" + id_monitor);
      let info_monitor = opcao_monitor.dataset.monitor;
      let info_imagem_monitor = opcao_monitor.dataset.imagem;
      let info_tipo_monitor = opcao_monitor.dataset.tipo;

      aoEnviarPersonalizado({monitor: info_monitor, tipo_monitor: info_tipo_monitor, imagem_monitor: info_imagem_monitor});

      //event.target.classList.toggle('red');

      // alert("Monitor selecionado: " + event.target.dataset.imagem);

      console.log(sistemaPersonalizado);

    } // function incluirMonitor

    function adicionaMonitores() {

      return (

            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={openMonitores}
                onClose={handleCloseMonitores}
                aria-labelledby="max-width-dialog-title"
            >
              <Grid container spacing={0}>

                  <Grid item xs={10}>
                      <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
                  </Grid>

                  <Grid item xs={2}>

                    <DialogActions>
                      <Link href="#" onClick={handleCloseMonitores}>
                          <Icon className="fas fa-times monte-icone-fechar" />
                      </Link>
                    </DialogActions>

                  </Grid>

              </Grid>

              <DialogContent>
                  <DialogContentText className="monte-subtitulo-opcao">
                      MONITORES
                  </DialogContentText>


                  <Grid justify="center" alignItems="flex-end" container spacing={0}>

                  {adicionaMonitor()}

                  </Grid>

              </DialogContent>
              
            </Dialog>

      );
    } // function adicionaMonitores


    function adicionaMonitor() {

      const [addMonitores, setAddMonitores] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Monitores
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"monitor"}})
        .then((response) => { 
            setAddMonitores(response.data);
        });

      },[]);
     
      return (
        addMonitores.map((monitor,index) => {

          const monitorPersonalizado = sistemaPersonalizado.monitor; // Opção armazenada até o momento
          let monte_destaque_monitor = ''; 
          let monte_destaque_monitor_circulo = ''; 

          // Destaco se existir dentro da lista atual
          if(monitor.texto_opcao == monitorPersonalizado) {
            monte_destaque_monitor = 'monte-destaque';
            monte_destaque_monitor_circulo = 'monte-destaque-circulo';
          }


          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirMonitor} id={"monitor-opcao-" + index} data-opcao={"monitor-opcao-" + index} data-monitor={monitor.texto_opcao} data-imagem={monitor.imagem} data-tipo={monitor.tipo} className="link-opcao monitor"> 
                        <div className="opcao-posicao">
                            <div className="opcao-imagem">

                              <img data-opcao={"monitor-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                              className={"opcao-monitor-circulo monitor-opcao-" + index + "-circulo " + monte_destaque_monitor_circulo} 
                              style={{width:'90%', opacity:'0'}} />

                              <br />

                              <img data-opcao={"monitor-opcao-" + index} src={monitor.imagem_opcao} alt={monitor.modelo} className="opcao-monitores" 
                              style={{marginTop: '-250px', marginBottom: '62px'}} />

                            </div>
                            <div className={"opcao-texto monitor-opcao-" + index + " " + monte_destaque_monitor}>
                              <Typography data-opcao={"monitor-opcao-" + index} variant="h6" component="h6" className="subtitulo">{monitor.texto_opcao}</Typography>
                              <Typography data-opcao={"monitor-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{monitor.subtexto_opcao}</Typography>
                            </div>
                        </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaMonitor

/*********************** ************* ************************/
/*********************** Fim Monitores ************************/
/*********************** ************* ************************/



/*********************** ******************* ************************/
/*********************** Início Insufladores ************************/
/*********************** ******************* ************************/

    // Insufladores
    const handleClickOpenInsufladores = (event) => {
      bloqueiaRecarremento(event);

      setOpenInsufladores(true);
    };

    const handleCloseInsufladores = (event) => {
      bloqueiaRecarremento(event);

      setOpenInsufladores(false);
    };

    /************************************************/
    /**Insufladores (Eventos de inclusão alteração)**/
    /************************************************/

    const incluirInsuflador = (event) => {
      bloqueiaRecarremento(event);

      let id_insuflador = event.target.dataset.opcao; // id

      // limpar destaque
      let limpar = document.querySelectorAll('.insuflador .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.insuflador .opcao-insuflador-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_insuflador);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_insuflador + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_insuflador = document.querySelector("#" + id_insuflador);      
      let info_insuflador = opcao_insuflador.dataset.insuflador;
      let info_imagem_insuflador = opcao_insuflador.dataset.imagem;   


      aoEnviarPersonalizado({insuflador: info_insuflador, imagem_insuflador: info_imagem_insuflador});
      

      //alert("Insuflador selecionado: " + event.target.dataset.insuflador);

      console.log(sistemaPersonalizado);

    } // incluirInsuflador

    function adicionaInsufladores() {

      return (

        <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={openInsufladores}
        onClose={handleCloseInsufladores}
        aria-labelledby="max-width-dialog-title"
    >
      <Grid container spacing={0}>

          <Grid item xs={10}>
              <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
          </Grid>

          <Grid item xs={2}>

            <DialogActions>
              <Link href="#" onClick={handleCloseInsufladores}>
                 <Icon className="fas fa-times monte-icone-fechar" />
              </Link>
            </DialogActions>

          </Grid>

      </Grid>

      <DialogContent>
          <DialogContentText className="monte-subtitulo-opcao">
              INSUFLADORES
          </DialogContentText>

           <Grid justify="center" alignItems="center" container spacing={0}>

              {adicionaInsuflador()}

           </Grid>

      </DialogContent>
       
    </Dialog>


      );

    } // function adicionaInsufladores


    function adicionaInsuflador() {

      const [addInsufladores, setAddInsufladores] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Insufladores
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"insuflador"}})
        .then((response) => { 
            setAddInsufladores(response.data);
        });

      },[]);


      return (
        addInsufladores.map((insuflador,index) => {

          const insufladorPersonalizado = sistemaPersonalizado.insuflador; // Opção armazenada até o momento
          let monte_destaque_insuflador = '';
          let monte_destaque_insuflador_circulo = ''; 
 

          // Destaco se existir dentro da lista atual
          if(insuflador.texto_opcao == insufladorPersonalizado) {
            monte_destaque_insuflador = 'monte-destaque';
            monte_destaque_insuflador_circulo = 'monte-destaque-circulo';
          }

          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirInsuflador} id={"insuflador-opcao-" + index} data-opcao={"insuflador-opcao-" + index} data-insuflador={insuflador.texto_opcao} data-imagem={insuflador.imagem} className="link-opcao insuflador">
                       <div className="opcao-posicao">
                            <div className="opcao-imagem">

                              <img data-opcao={"insuflador-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                              className={"opcao-insuflador-circulo insuflador-opcao-" + index + "-circulo " + monte_destaque_insuflador_circulo} 
                              style={{width:'90%', opacity:'0'}} />

                              <br />

                              <img data-opcao={"insuflador-opcao-" + index} src={insuflador.imagem_opcao} alt={insuflador.modelo} className="opcao-insufladores"
                                style={{marginTop: '-200px', marginBottom: '16px'}} />

                           </div>
                           <div className={ "opcao-texto insuflador-opcao-" + index + " " + monte_destaque_insuflador}>
                                <Typography data-opcao={"insuflador-opcao-" + index}  variant="h6" component="h6" className="subtitulo">{insuflador.texto_opcao}</Typography>
                                <Typography data-opcao={"insuflador-opcao-" + index}  variant="h6" component="h6" className="subtitulo auxiliar">{insuflador.subtexto_opcao}</Typography>
                            </div>
                        </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaInsuflador

/*********************** **************** ************************/
/*********************** Fim Insufladores ************************/
/*********************** **************** ************************/


/*********************** ************** ************************/
/*********************** Início Cameras ************************/
/*********************** ************** ************************/


    // Câmeras
    const handleClickOpenCameras = (event) => {
      bloqueiaRecarremento(event);

      setOpenCameras(true);
    };

    const handleCloseCameras = (event) => {
      bloqueiaRecarremento(event);

      setOpenCameras(false);
    };

     /*******************************************/
     /**Cameras (Eventos de inclusão alteração)**/
     /*******************************************/

     const incluirCamera = (event) => {
      bloqueiaRecarremento(event);
      
      let id_camera = event.target.dataset.opcao; // id

      // limpar destaque
      let limpar = document.querySelectorAll('.camera .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.camera .opcao-camera-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_camera);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_camera + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_camera = document.querySelector("#" + id_camera);
      let info_camera = opcao_camera.dataset.camera;
      let info_imagem_camera = opcao_camera.dataset.imagem;
      let info_tipo_camera = opcao_camera.dataset.tipo;

      aoEnviarPersonalizado({camera: info_camera,tipo_camera: info_tipo_camera,imagem_camera: info_imagem_camera});

      //alert("Camera selecionada: " + event.target.dataset.camera);

      console.log(sistemaPersonalizado);

    }

    function adicionaCameras() {

      return (

        <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={openCameras}
        onClose={handleCloseCameras}
        aria-labelledby="max-width-dialog-title"
    >
      <Grid container spacing={0}>

          <Grid item xs={10}>
              <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
          </Grid>

          <Grid item xs={2}>

            <DialogActions>
              <Link href="#" onClick={handleCloseCameras}>
                 <Icon className="fas fa-times monte-icone-fechar" />
              </Link>
            </DialogActions>

          </Grid>

      </Grid>

      <DialogContent>
          <DialogContentText className="monte-subtitulo-opcao">
              CÂMERAS
              <br />
              <span className="informacao">Estão disponíveis para seleção apenas as câmeras compatíveis com o monitor selecionado.</span>
          </DialogContentText>

           <Grid justify="center" alignItems="center" container spacing={0}>

              {adicionaCamera()}

           </Grid>

      </DialogContent>
       
    </Dialog>


      );

    } // function adicionaCameras


    function adicionaCamera() {

      const [addCameras, setAddCameras] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Cameras
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"camera"}})
        .then((response) => { 
            setAddCameras(response.data);
        });

      },[]);


      return (
        addCameras.map((camera,index) => {

          const cameraPersonalizado = sistemaPersonalizado.camera; // Opção armazenada até o momento
          let monte_destaque_camera = ''; 
          let monte_destaque_camera_circulo = ''; 

          // Destaco se existir dentro da lista atual
          if(camera.texto_opcao == cameraPersonalizado) {
            monte_destaque_camera = 'monte-destaque';
            monte_destaque_camera_circulo = 'monte-destaque-circulo'; 
          }

          const monitorPersonalizadoTipo = sistemaPersonalizado.tipo_monitor;
          let opacidade_camera = 1;

          // Opacidade
          if(camera.tipo != monitorPersonalizadoTipo) {
             opacidade_camera = 0.5;
          }


          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={ (opacidade_camera == 1) ? incluirCamera : preventDefault} id={"camera-opcao-" + index} data-opcao={"camera-opcao-" + index} data-camera={camera.texto_opcao} data-imagem={camera.imagem} data-tipo={camera.tipo} className="link-opcao camera">
                         <div className="opcao-posicao" style={{opacity: opacidade_camera}}>
                              <div className="opcao-imagem">

                                <img data-opcao={"camera-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                                className={"opcao-camera-circulo camera-opcao-" + index + "-circulo " + monte_destaque_camera_circulo} 
                                style={{width:'90%', opacity:'0'}} />
                                
                                <br />

                                <img data-opcao={"camera-opcao-" + index} src={camera.imagem_opcao} alt={camera.modelo} className="opcao-cameras" 
                                style={{marginTop: '-210px', marginBottom: '30px'}} />

                              </div>
                              <div className={"opcao-texto camera-opcao-" + index + " " + monte_destaque_camera}>
                                <Typography data-opcao={"camera-opcao-" + index} variant="h6" component="h6" className="subtitulo">{camera.texto_opcao}</Typography>
                                <Typography data-opcao={"camera-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{camera.subtexto_opcao}</Typography>
                              </div>
                          </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaCamera



/*********************** *********** ************************/
/*********************** Fim Cameras ************************/
/*********************** *********** ************************/


/*********************** ************ ************************/
/*********************** Início Luzes ************************/
/*********************** ************ ************************/


    // Luzes
    const handleClickOpenLuzes = (event) => {
      bloqueiaRecarremento(event);

      setOpenLuzes(true);
    };

    const handleCloseLuzes = (event) => {
      bloqueiaRecarremento(event);

      setOpenLuzes(false);
    };

    /*****************************************/
    /**Luzes (Eventos de inclusão alteração)**/
    /*****************************************/
    const incluirLuz = (event) => {
      bloqueiaRecarremento(event);

      let id_luz = event.target.dataset.opcao; // id

      // limpar destaque
      let limpar = document.querySelectorAll('.luz .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.luz .opcao-luz-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_luz);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_luz + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_luz = document.querySelector("#" + id_luz);
      let info_luz = opcao_luz.dataset.luz;
      let info_imagem_luz = opcao_luz.dataset.imagem;

      aoEnviarPersonalizado({luz: info_luz, imagem_luz: info_imagem_luz});

      //alert("Luz selecionada: " + event.target.dataset.luz);

      console.log(sistemaPersonalizado);

    }

    function adicionaLuzes() {
     return ( 
      <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={openLuzes}
      onClose={handleCloseLuzes}
      aria-labelledby="max-width-dialog-title"
  >
    <Grid container spacing={0}>

        <Grid item xs={10}>
            <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
        </Grid>

        <Grid item xs={2}>

          <DialogActions>
            <Link href="#" onClick={handleCloseLuzes}>
               <Icon className="fas fa-times monte-icone-fechar" />
            </Link>
          </DialogActions>

        </Grid>

    </Grid>

    <DialogContent>
        <DialogContentText className="monte-subtitulo-opcao">
            FONTES DE LUZ
        </DialogContentText>

         <Grid justify="center" alignItems="center" container spacing={0}>

            {adicionaLuz()}

         </Grid>

    </DialogContent>
     
  </Dialog>

      );

    } // function adicionaLuzes


    function adicionaLuz() {

      const [addLuzes, setAddLuzes] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Cameras
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"luz"}})
        .then((response) => { 
            setAddLuzes(response.data);
        });

      },[]);


      return (
        addLuzes.map((luz,index) => {

          const luzPersonalizado = sistemaPersonalizado.luz; // Opção armazenada até o momento
          let monte_destaque_luz = ''; 
          let monte_destaque_luz_circulo = '';

          // Destaco se existir dentro da lista atual
          if(luz.texto_opcao == luzPersonalizado) {
            monte_destaque_luz = 'monte-destaque';
            monte_destaque_luz_circulo = 'monte-destaque-circulo';
          }

          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirLuz} id={"luz-opcao-" + index} data-opcao={"luz-opcao-" + index} data-luz={luz.texto_opcao} data-imagem={luz.imagem} className="link-opcao luz">
                        <div className="opcao-posicao">
                              <div className="opcao-imagem">

                                <img data-opcao={"luz-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                                  className={"opcao-luz-circulo luz-opcao-" + index + "-circulo " + monte_destaque_luz_circulo} 
                                  style={{width:'90%', opacity:'0'}} />
                                  
                                  <br />

                                  <img data-opcao={"luz-opcao-" + index} src={luz.imagem_opcao} alt={luz.modelo} className="opcao-luzes opcao-imagem" 
                                   style={{marginTop: '-210px', marginBottom: '30px'}} />

                              </div>
                              <div className={"opcao-texto luz-opcao-" + index + " " + monte_destaque_luz}>
                                <Typography data-opcao={"luz-opcao-" + index} variant="h6" component="h6" className="subtitulo">{luz.texto_opcao}</Typography>
                                <Typography data-opcao={"luz-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{luz.subtexto_opcao}</Typography>
                              </div>
                          </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaLuz

/*********************** ********* ************************/
/*********************** Fim Luzes ************************/
/*********************** ********* ************************/

/*********************** ***************** ************************/
/*********************** Início Gravadores ************************/
/*********************** ***************** ************************/

    // Gravadores
    const handleClickOpenGravadores = (event) => {
      bloqueiaRecarremento(event);

      setOpenGravadores(true);
    };

    const handleCloseGravadores = (event) => {
      bloqueiaRecarremento(event);

      setOpenGravadores(false);
    };

    /********************************************/
    /**Gravador (Eventos de inclusão alteração)**/
    /********************************************/

    const incluirGravador = (event) => {
      bloqueiaRecarremento(event);
      
      let id_gravador = event.target.dataset.opcao; // id

      // limpar destaque
      let limpar = document.querySelectorAll('.gravador .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.gravador .opcao-gravador-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_gravador);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_gravador + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_gravador = document.querySelector("#" + id_gravador);
      let info_gravador = opcao_gravador.dataset.gravador;
      let info_imagem_gravador = opcao_gravador.dataset.imagem;

      aoEnviarPersonalizado({gravador: info_gravador, imagem_gravador: info_imagem_gravador});

      //alert("Gravador selecionado: " + event.target.dataset.gravador);

      console.log(sistemaPersonalizado);

    } // incluirGravador


    function adicionaGravadores() {
      return (

        <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={openGravadores}
        onClose={handleCloseGravadores}
        aria-labelledby="max-width-dialog-title"
    >
      <Grid container spacing={0}>

          <Grid item xs={10}>
              <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
          </Grid>

          <Grid item xs={2}>

            <DialogActions>
              <Link href="#" onClick={handleCloseGravadores}>
                  <Icon className="fas fa-times monte-icone-fechar" />
              </Link>
            </DialogActions>

          </Grid>

      </Grid>

      <DialogContent>
          <DialogContentText className="monte-subtitulo-opcao">
              GRAVADORES
          </DialogContentText>

           <Grid justify="center" alignItems="center" container spacing={0}>

              {adicionaGravador()}

           </Grid>

      </DialogContent>
       
    </Dialog>


      );
    } // function adicionaGravadores


    function adicionaGravador() {

      const [addGravadores, setAddGravadores] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Gravadores
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"gravador"}})
        .then((response) => { 
            setAddGravadores(response.data);
        });

      },[]);


      return (
        addGravadores.map((gravador,index) => {

          const gravadorPersonalizado = sistemaPersonalizado.gravador; // Opção armazenada até o momento
          let monte_destaque_gravador = ''; 
          let monte_destaque_gravador_circulo = '';

          // Destaco se existir dentro da lista atual
          if(gravador.texto_opcao == gravadorPersonalizado) {
            monte_destaque_gravador = 'monte-destaque';
            monte_destaque_gravador_circulo = 'monte-destaque-circulo';
          }

          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirGravador} id={"gravador-opcao-" + index} data-opcao={"gravador-opcao-" + index} data-gravador={gravador.texto_opcao} data-imagem={gravador.imagem}  className="link-opcao gravador"> 
                           <div className="opcao-posicao">
                              <div className="opcao-imagem">

                               <img data-opcao={"gravador-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                                  className={"opcao-gravador-circulo gravador-opcao-" + index + "-circulo " + monte_destaque_gravador_circulo} 
                                  style={{width:'90%', opacity:'0'}} />
                                  
                               <br />

                               <img data-opcao={"gravador-opcao-" + index} src={gravador.imagem_opcao} alt={gravador.modelo} className="opcao-gravadores" 
                               style={{marginTop: '-210px', marginBottom: '30px'}} />
                           </div>
                           <div className={"opcao-texto gravador-opcao-" + index + " " + monte_destaque_gravador}>
                             <Typography data-opcao={"gravador-opcao-" + index} variant="h6" component="h6" className="subtitulo">{gravador.texto_opcao}</Typography>
                             <Typography data-opcao={"gravador-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{gravador.subtexto_opcao}</Typography>
                           </div>
                        </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaGravador
 
/*********************** ************** ************************/
/*********************** Fim Gravadores ************************/
/*********************** ************** ************************/


/*********************** *************** ************************/
/*********************** Início Armários ************************/
/*********************** *************** ************************/

    // Armários
    const handleClickOpenArmarios = (event) => {
      bloqueiaRecarremento(event);

      setOpenArmarios(true);
    };

    const handleCloseArmarios = (event) => {
      bloqueiaRecarremento(event);

      setOpenArmarios(false);
    };

    /*******************************************/
    /**Armário (Eventos de inclusão alteração)**/
    /*******************************************/

    const incluirArmario = (event) => {
      bloqueiaRecarremento(event);

      let id_armario = event.target.dataset.opcao; // id

      // limpar destaque
      let limpar = document.querySelectorAll('.armario .opcao-texto');
      limpar.forEach( (el) => {
          return el.classList.remove('monte-destaque');
      });

      // limpar destaque circulo
      let limparCirculo = document.querySelectorAll('.armario .opcao-armario-circulo');
      limparCirculo.forEach( (el) => {
          return el.classList.remove('monte-destaque-circulo');
      });

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_armario);
      destaque.classList.toggle('monte-destaque');

      // destacar opção selecionada (circulo)
      let destaqueCirculo = document.querySelector("." + id_armario + "-circulo");
      destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_armario = document.querySelector("#" + id_armario);      
      let info_armario = opcao_armario.dataset.armario;
      let info_imagem_armario = opcao_armario.dataset.imagem;

      aoEnviarPersonalizado({armario: info_armario, imagem_armario: info_imagem_armario});

      //alert("Armário selecionado: " + event.target.dataset.armario);

      console.log(sistemaPersonalizado);

    }// incluirArmario

    function adicionaArmarios() {

      return (

        <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={openArmarios}
        onClose={handleCloseArmarios}
        aria-labelledby="max-width-dialog-title"
    >
      <Grid container spacing={0}>

          <Grid item xs={10}>
              <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"><Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
          </Grid>

          <Grid item xs={2}>

            <DialogActions>
              <Link href="#" onClick={handleCloseArmarios}>
                  <Icon className="fas fa-times monte-icone-fechar" />
              </Link>
            </DialogActions>

          </Grid>

      </Grid>

      <DialogContent>
          <DialogContentText className="monte-subtitulo-opcao">
              ARMÁRIOS
          </DialogContentText>

           <Grid justify="center" alignItems="center" container spacing={0}>

              {adicionaArmario()}

           </Grid>

      </DialogContent>
       
    </Dialog>


      );

    } // function adicionaArmarios


    function adicionaArmario() {

      const [addArmarios, setAddArmarios] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Armarios
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"armario"}})
        .then((response) => { 
            setAddArmarios(response.data);
        });

      },[]);


      return (
        addArmarios.map((armario,index) => {

          const armarioPersonalizado = sistemaPersonalizado.armario; // Opção armazenada até o momento
          let monte_destaque_armario = ''; 
          let monte_destaque_armario_circulo = '';

          // Destaco se existir dentro da lista atual
          if(armario.texto_opcao == armarioPersonalizado) {
            monte_destaque_armario = 'monte-destaque';
            monte_destaque_armario_circulo = 'monte-destaque-circulo'
          }

          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirArmario} id={"armario-opcao-" + index} data-opcao={"armario-opcao-" + index} data-armario={armario.texto_opcao} data-imagem={armario.imagem} className="link-opcao armario"> 
                        <div className="opcao-posicao">
                            <div className="opcao-imagem">

                               <img data-opcao={"armario-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                                  className={"opcao-armario-circulo armario-opcao-" + index + "-circulo " + monte_destaque_armario_circulo} 
                                  style={{width:'90%', opacity:'0'}} />
                                  
                               <br />

                              <img data-opcao={"armario-opcao-" + index} src={armario.imagem_opcao} alt={armario.modelo} className="opcao-armarios" 
                              style={{marginTop: '-314px', marginBottom: '0'}} />

                            </div>
                            <div className={"opcao-texto armario-opcao-" + index + " " + monte_destaque_armario }>
                              <Typography data-opcao={"armario-opcao-" + index} variant="h6" component="h6" className="subtitulo">{armario.texto_opcao}</Typography>
                              <Typography data-opcao={"armario-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{armario.subtexto_opcao}</Typography>
                            </div>
                        </div>
                      </Link>
                </Grid>);

       }));
      
    } // function adicionaArmario

/*********************** ************ ************************/
/*********************** Fim Armários ************************/
/*********************** ************ ************************/

/*********************** ***************** ************************/
/*********************** Início Acessórios ************************/
/*********************** ***************** ************************/

    // Acessórios
    const handleClickOpenAcessorios = (event) => {
      bloqueiaRecarremento(event);

      setOpenAcessorios(true);
    };

    const handleCloseAcessorios = (event) => {
      bloqueiaRecarremento(event);

      setOpenAcessorios(false);
    };

    /*********************************************/
    /**Acessório (Eventos de inclusão alteração)**/
    /*********************************************/

    const incluirAcessorio = (event) => {
      bloqueiaRecarremento(event);

      let id_acessorio = event.target.dataset.opcao; // id

      // destacar opção selecionada
      let destaque = document.querySelector("." + id_acessorio);
      destaque.classList.toggle('monte-destaque');

       // destacar opção selecionada (circulo)
       let destaqueCirculo = document.querySelector("." + id_acessorio + "-circulo");
       destaqueCirculo.classList.toggle('monte-destaque-circulo');

      // informações da opção selecionada
      let opcao_acessorio = document.querySelector("#" + id_acessorio);
      
      let info_acessorio = opcao_acessorio.dataset.acessorios;
      let info_imagem_acessorio = opcao_acessorio.dataset.imagem;
      let vetorAcessorios = '';

      // Incluir acessório
      if(destaque.classList.contains('monte-destaque') == true) { 

        info_acessorio = info_acessorio + ' + ' + sistemaPersonalizado.acessorios ;

        vetorAcessorios = info_acessorio.split(' + ');

      } else {

        //  Remover acessório
        info_acessorio = sistemaPersonalizado.acessorios ;

        vetorAcessorios = info_acessorio.split(' + ');

        vetorAcessorios = vetorAcessorios.filter(function(acessorio){
          return acessorio != opcao_acessorio.dataset.acessorios;
        });

        info_acessorio = vetorAcessorios.join(' + ');

      }

      aoEnviarPersonalizado({acessorios: info_acessorio});

      console.log(sistemaPersonalizado);
      console.log(vetorAcessorios);

    } // incluirAcessorio

    function adicionaAcessorios() {

      return (
        <>
            <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={openAcessorios}
            onClose={handleCloseAcessorios}
            aria-labelledby="max-width-dialog-title">

            <Grid container spacing={0}>

                <Grid item xs={10}>
                    <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao"> <Icon className="fa fa-angle-left icone" /> ADICIONAR MÓDULO</DialogTitle>
                </Grid>

                <Grid item xs={2}>

                  <DialogActions>
                    <Link href="#" onClick={handleCloseAcessorios}>
                       <Icon className="fas fa-times monte-icone-fechar" />
                    </Link>
                  </DialogActions>

                </Grid>

            </Grid>

            <DialogContent>
                <DialogContentText className="monte-subtitulo-opcao">
                    ACESSÓRIOS
                </DialogContentText>

                <Grid justify="center" alignItems="center" container spacing={0}>

                    {adicionaAcessorio()}

                </Grid>

            </DialogContent>
            
          </Dialog>

        </>
      );

    } // function adicionaAcessorios


    function adicionaAcessorio() {

      const [addAcessorios, setAddAcessorios] = useState([ {
        equipamento:'',
        modelo:'',
        tipo:'',
        imagem: '', 
        descricao: '',
        imagem_opcao:'', 
        texto_opcao: '', 
        subtexto_opcao: '',
        descricao: ''}]); // Acessorios
  

      useEffect(() => {

        api.get('',{params:{action:"listar_opcoes",equipamento:"acessorios"}})
        .then((response) => { 
            setAddAcessorios(response.data);
        });

      },[]);


      return (

        addAcessorios.map((acessorios,index) => {

          const acessoriosPersonalizados = sistemaPersonalizado.acessorios.split(' + ');
          let monte_destaque_acessorio = ''; 
          let monte_destaque_acessorio_circulo = '';

          acessoriosPersonalizados.find(function(itemAtual,indexAtual){
            
            // Destaco se existir dentro da lista atual
            if(acessorios.texto_opcao == itemAtual) {
              monte_destaque_acessorio = 'monte-destaque';
              monte_destaque_acessorio_circulo = 'monte-destaque-circulo';
            }

          });

          return (<Grid item xs={12} sm={4} md={3} className="opcao-item" key={index}>
                      <Link href="#" onClick={incluirAcessorio} id={"acessorio-opcao-" + index} data-opcao={"acessorio-opcao-" + index} data-acessorios={acessorios.texto_opcao} data-imagem={acessorios.imagem} className="link-opcao acessorio"> 
                        <div className="opcao-posicao">
                           <div className="opcao-imagem">

                            <img data-opcao={"acessorio-opcao-" + index} src={Constante.BASE_URL_CONF_REACT+ '/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/fundo_circulo_menor.png'} alt="Círculo de destaque" 
                                  className={"opcao-acessorio-circulo acessorio-opcao-" + index + "-circulo " + monte_destaque_acessorio_circulo} 
                                  style={{width:'100%', opacity:'0'}} />

                              <br />

                             <img data-opcao={"acessorio-opcao-" + index} src={acessorios.imagem_opcao} alt={acessorios.modelo} className="opcao-acessorios" 
                             style={{marginTop: '-314px', marginBottom: '0'}} />
                           </div>
                           <div className={"opcao-texto acessorio-opcao-" + index + " " + monte_destaque_acessorio}>
                             <Typography data-opcao={"acessorio-opcao-" + index} variant="h6" component="h6" className="subtitulo">{acessorios.texto_opcao}</Typography>
                             <Typography data-opcao={"acessorio-opcao-" + index} variant="h6" component="h6" className="subtitulo auxiliar">{acessorios.subtexto_opcao}</Typography>
                           </div>
                        </div>
                      </Link>
                </Grid>);

       }) );
      
    } // function adicionaAcessorio

/*********************** ************** ************************/
/*********************** Fim Acessórios ************************/
/*********************** ************** ************************/



/*********************** ************** ************************/
/*********************** Início Módulos ************************/
/*********************** ************** ************************/
    
    // Módulos
    const handleClickOpen = (event) => {
      bloqueiaRecarremento(event);

      setOpen(true);
    };

    const handleClose = (event) => {
      bloqueiaRecarremento(event);

      setOpen(false);
    };

    function adicionaModulo() {

      let opacidade_modulo_monitor = 1;
      let opacidade_modulo_insuflador = 1;
      let opacidade_modulo_camera = 1;
      let opacidade_modulo_luz = 1;
      let opacidade_modulo_gravador = 1;
      let opacidade_modulo_armario = 1;
      let opacidade_modulo_acessorios = 1;

      if(sistemaPersonalizado.monitor != '') { opacidade_modulo_monitor = 0.5 }
      if(sistemaPersonalizado.insuflador != '') { opacidade_modulo_insuflador = 0.5 }
      if(sistemaPersonalizado.camera != '') { opacidade_modulo_camera = 0.5 }
      if(sistemaPersonalizado.luz != '') { opacidade_modulo_luz = 0.5 }
      if(sistemaPersonalizado.gravador != '') { opacidade_modulo_gravador = 0.5 }
      if(sistemaPersonalizado.armario != '') { opacidade_modulo_armario = 0.5 }
      if(sistemaPersonalizado.acessorios != '') { opacidade_modulo_acessorios = 0.5 }

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
              <DialogTitle id="max-width-dialog-title" className="monte-titulo-opcao">ADICIONAR MÓDULO</DialogTitle>
          </Grid>

          <Grid item xs={2}>

            <DialogActions>
              <Link href="#" onClick={handleClose}>
                <Icon className="fas fa-times monte-icone-fechar" />
              </Link>
            </DialogActions>

          </Grid>

      </Grid>

      <DialogContent>

           <Grid justify="center" alignItems="center" container spacing={0}>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenMonitores} style={{opacity: opacidade_modulo_monitor}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_monitores.jpg"} alt="" className="opcao-monitores opcao-imagem" />
                  </Link>
              </Grid>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenInsufladores} style={{opacity: opacidade_modulo_insuflador}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_insufladores.jpg"} alt="" className="opcao-insufladores opcao-imagem" />
                  </Link>
              </Grid>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenCameras} style={{opacity: opacidade_modulo_camera}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_cameras.jpg"} alt="" className="opcao-cameras opcao-imagem" />
                  </Link>
              </Grid>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenLuzes} style={{opacity: opacidade_modulo_luz}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_luzes.jpg"} alt="" className="opcao-luzes opcao-imagem" />
                  </Link>
              </Grid>

           </Grid>

           <Grid justify="center" alignItems="center" container spacing={0}>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenGravadores} style={{opacity: opacidade_modulo_gravador}}> 
                    <img src= { Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_gravadores.jpg" } alt="" className="opcao-gravadores opcao-imagem" />
                  </Link>
              </Grid>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenArmarios} style={{opacity: opacidade_modulo_armario}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_armarios.jpg" } alt="" className="opcao-armarios opcao-imagem" />
                  </Link>
              </Grid>

              <Grid item xs={12} sm={4} md={3} className="opcao-item">
                  <Link href="#" onClick={handleClickOpenAcessorios} style={{opacity: opacidade_modulo_acessorios}}> 
                    <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/modulos/opcao_acessorios.jpg" } alt="" className="opcao-acessorios opcao-imagem" />
                  </Link>
              </Grid>

           </Grid>

      </DialogContent>
       
    </Dialog>

      );

    } // function adicionaModulo

/*********************** *********** ************************/
/*********************** Fim Módulos ************************/
/*********************** *********** ************************/

/*********************** ****************** ************************/
/*********************** Início Equipamento ************************/
/*********************** ****************** ************************/

function adicionaEquipamento() {

  return (<Link href="#" onClick={handleClickOpen} className="botao-link"> + ADICIONAR EQUIPAMENTO OU ACESSÓRIO</Link>);

} // adicionaEquipamento

/*********************** *************** ************************/
/*********************** Fim Equipamento ************************/
/*********************** *************** ************************/



/*********************** ********************** ************************/
/*********************** Início Sistema Montado ************************/
/*********************** ********************** ************************/


function sistemaMontado() {
      return (

        <Grid container spacing={0} className="sistema" >


        <Grid item xs={6} md={6} className="imagem">
                <div className="sistema-personalizado-imagem" style={{textAlign:'center',position:'relative',height:'568px'}}>
                        <div className="imagem-auxiliar-posicao-1">
                            <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/logo-fundo.jpg" } alt="Logo Fundo" className="tamanho-maximo logo-fundo" />
                        </div>

                        <div className="imagem-auxiliar-posicao-2">
                            <img src={ Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/sugestao/montagem/estante_transparente.png" } alt="Estante" className="tamanho-maximo" />
                        </div>

                        <div className="imagem-auxiliar-posicao-3">
                            <a href="#" className="destaque" onClick={handleClickOpenMonitores}> <img src={ sistemaPersonalizado.imagem_monitor } alt="Monitor" className="tamanho-maximo monitor" /></a>
                        </div>

                        <div className="imagem-auxiliar-posicao-4">
                            <a href="#" className="destaque" onClick={handleClickOpenInsufladores}><img src={ sistemaPersonalizado.imagem_insuflador } alt="Insuflador" className="tamanho-maximo insuflador" /></a>
                        </div>

                        <div className="imagem-auxiliar-posicao-5">
                            <a href="#" className="destaque" onClick={handleClickOpenCameras}><img src={ sistemaPersonalizado.imagem_camera } alt="Camera" className="tamanho-maximo camera" /></a>
                        </div>

                        <div className="imagem-auxiliar-posicao-6">
                            <a href="#" className="destaque" onClick={handleClickOpenLuzes}><img src={ sistemaPersonalizado.imagem_luz } alt="Luz" className="tamanho-maximo luz" /></a>
                        </div>

                        <div className="imagem-auxiliar-posicao-7">
                             <a href="#" className="destaque" onClick={handleClickOpenGravadores}><img src={ sistemaPersonalizado.imagem_gravador } alt="Gravador" className="tamanho-maximo gravador" /></a>
                        </div>
                </div>
        </Grid>
        <Grid item xs={6} md={6} className="texto">
          <div className="sistema-personalizado-texto" style={{position:'relative',height:'568px'}}>

            <div className="texto-auxiliar-posicao-1">
                <Typography variant="h5" component="h5" className="titulo-sistema">{sistemaPersonalizado.sistema}</Typography>
            </div>

            <div className="texto-auxiliar-posicao-2">
                  <Typography variant="body1" gutterBottom className="ajuda">Adicione ou clique nos equipamentos para personalizar seu sistema.</Typography>
            </div>

            {sistemaPersonalizado.monitor != '' &&
              <div className="texto-auxiliar-posicao-3">
                    <Typography variant="body1" gutterBottom className="auxiliar monitor">Monitor de Grau Médico</Typography>  
                    <a href="#" className="destaque" onClick={handleClickOpenMonitores}>{sistemaPersonalizado.monitor}</a>
                    <div className="linha-destaque monitor"></div>
              </div>
            }

           {sistemaPersonalizado.insuflador != '' &&
            <div className="texto-auxiliar-posicao-4">
                <Typography variant="body1" gutterBottom className="auxiliar insuflador">Insuflador</Typography>
                <a href="#" className="destaque" onClick={handleClickOpenInsufladores}>{sistemaPersonalizado.insuflador}</a>
                <div className="linha-destaque insuflador"></div>
            </div>
           }

           {sistemaPersonalizado.camera != '' &&
            <div className="texto-auxiliar-posicao-5">
                <Typography variant="body1" gutterBottom className="auxiliar camera">Microcâmera</Typography>
                <a href="#" className="destaque" onClick={handleClickOpenCameras}>{sistemaPersonalizado.camera}</a>
                <div className="linha-destaque camera"></div>
            </div>
           }

           {sistemaPersonalizado.luz != '' &&

              <div className="texto-auxiliar-posicao-6">
                  <Typography variant="body1" gutterBottom className="auxiliar luz">Fonte de Luz</Typography>
                  <a href="#" className="destaque" onClick={handleClickOpenLuzes}>{sistemaPersonalizado.luz}</a>
                  <div className="linha-destaque luz"></div>
              </div>

           }

           {sistemaPersonalizado.gravador != '' &&

              <div className="texto-auxiliar-posicao-7">
                <Typography variant="body1" gutterBottom className="auxiliar gravador">Gravador</Typography>
                <a href="#" className="destaque" onClick={handleClickOpenGravadores}>{sistemaPersonalizado.gravador}</a>
                <div className="linha-destaque gravador"></div>
              </div>
           
           }

          {((sistemaPersonalizado.armario != '') || (sistemaPersonalizado.acessorios != '')) &&

            <div className="texto-auxiliar-posicao-8">
                <a href="#" className="acessorios" onClick={handleClickOpenArmarios}>{sistemaPersonalizado.armario} </a> <a href="#" className="acessorios" onClick={handleClickOpenAcessorios}>{sistemaPersonalizado.acessorios}</a>
            </div>

          }

          </div>
          
          {adicionaEquipamento()}

        </Grid>
    </Grid>


        );
    } // function sistemaMontado


/*********************** ******************* ************************/
/*********************** Fim Sistema Montado ************************/
/*********************** ******************* ************************/


/*********************** ************************************ ************************/
/*********************** Início de Renderização do componente ************************/
/*********************** ************************************ ************************/

    return (
      <section id="monte" className="oculta">

          <Container maxWidth="lg" className="conteudo">
             {sistemaMontado()}
          </Container>

          {adicionaModulo()}

          {adicionaMonitores()}

          {adicionaInsufladores()}

          {adicionaCameras()}

          {adicionaLuzes()}

          {adicionaGravadores()}

          {adicionaArmarios()}

          {adicionaAcessorios()}

          
      </section>

  );

/*********************** ********************************* ************************/
/*********************** Fim de Renderização do componente ************************/
/*********************** ********************************* ************************/

} ///function Monte