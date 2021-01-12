import React, {useState} from 'react';
import Configuracao from './components/Configuracao';
import Escolha from './components/Escolha';
import Sugestao from './components/Sugestao';
import Monte from './components/Monte';
import Orcamento from './components/Orcamento';
import Aviso from './components/Aviso';
import './css/App.css';
import * as Constante from './Constantes.js';

function App() {


  const imagem_inicial = Constante.BASE_URL_CONF_REACT + "/wp-content/plugins/confiance-medical-monte-o-seu/public/images/quadrado_transparente.png";

  const [dadosSugestao, setSugestao] = useState({acessorios:'',
                                               armario:'', 
                                               imagem_armario: imagem_inicial,
                                               gravador:'',
                                               imagem_gravador: imagem_inicial,
                                               camera:'',
                                               tipo_camera:'',
                                               imagem_camera: imagem_inicial,
                                               luz:'',
                                               imagem_luz: imagem_inicial,
                                               insuflador:'',
                                               imagem_insuflador: imagem_inicial,
                                               monitor:'',
                                               tipo_monitor:'',
                                               imagem_monitor: imagem_inicial,
                                               sistema: 'Sistema Sugerido'});

  const [dadosPersonalizado, setPersonalizado] = useState({acessorios:'',
                                               armario:'', 
                                               imagem_armario: imagem_inicial,
                                               gravador:'',
                                               imagem_gravador: imagem_inicial,
                                               camera:'',
                                               tipo_camera:'',
                                               imagem_camera: imagem_inicial,
                                               luz:'',
                                               imagem_luz: imagem_inicial,
                                               insuflador:'',
                                               imagem_insuflador: imagem_inicial,
                                               monitor:'',
                                               tipo_monitor:'',
                                               imagem_monitor: imagem_inicial,
                                               sistema: 'Sistema Personalizado'});

  const[marcadorSistema, setMarcadorSistema] = useState({acessorios:'',
                                                        armario:'', 
                                                        imagem_armario: imagem_inicial,
                                                        gravador:'',
                                                        imagem_gravador: imagem_inicial,
                                                        camera:'',
                                                        tipo_camera:'',
                                                        imagem_camera: imagem_inicial,
                                                        luz:'',
                                                        imagem_luz: imagem_inicial,
                                                        insuflador:'',
                                                        imagem_insuflador: imagem_inicial,
                                                        monitor:'',
                                                        tipo_monitor:'',
                                                        imagem_monitor: imagem_inicial,
                                                        sistema: 'Sistema'});

  function coletarDadosSugestao(dados) {
    setSugestao({...dadosSugestao, ...dados});
  }

  function coletarDadosPersonalizado(dados) {
    setPersonalizado({...dadosPersonalizado, ...dados});
  }

  function sistemaMarcado(dados) {
    setMarcadorSistema({...marcadorSistema,...dados});
  }
  
    return (
      <>
        <Configuracao aoEnviarSugestao={coletarDadosSugestao} aoEnviarPersonalizado={coletarDadosPersonalizado} />
        <Escolha sistemaSugestao={dadosSugestao} sistemaPersonalizado={dadosPersonalizado} sistemaMarcadoEscolhido={marcadorSistema} sistemaEscolhido={sistemaMarcado} />
        <Sugestao sistemaSugestao={dadosSugestao} aoEnviarSugestao={coletarDadosSugestao} />
        <Monte sistemaPersonalizado={dadosPersonalizado} aoEnviarPersonalizado={coletarDadosPersonalizado} />
        <Orcamento sistemaSugestao={dadosSugestao} sistemaPersonalizado={dadosPersonalizado} sistemaMarcadoEscolhido={marcadorSistema} sistemaEscolhido={sistemaMarcado} />
        <Aviso />
      </>
    );
}

export default App;