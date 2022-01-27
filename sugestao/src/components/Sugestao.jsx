import { useState, useEffect } from 'react';
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import List from './List';

/*

    Configuração package.json:
        {
            "proxy": "http://localhost:8000"
        }

        Essa configuração permite passar como url apenas '/message/'. 
        Se não fosse ela, teria que passar 'http://localhost:8000/message/'
    
*/

function Sugestao() {

  const [sugestoes, setSugestoes] = useState(null);
  const [formSugestao, setFormSugestao] = useState({ email: '', message: '' });

  const [isExpandido, setExpandido] = useState(false);
  const [linhas, setLinhas] = useState(1);

  useEffect(() => getSugestoes(), []);

  // API GET
  //
  function getSugestoes() {

    axios({ method: 'GET', url: '/message/', })

      .then((response) => setSugestoes(response.data))

      .catch((error) => {

        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }

      })

  }

  // API POST
  //
  function criarSugestao(event) {

    axios({

      method: 'POST',
      url: '/message/',
      data: {
        email: formSugestao.email,
        message: formSugestao.message
      }

    }).then((response) => getSugestoes());

    setFormSugestao({ email: '', message: '' });

    setExpandido(false);

    // ignora o comportamento padrão do evento
    event.preventDefault();
  }

  // API DELETE
  //
  function apagarSugestao(id) {

    axios({

      method: 'DELETE',
      url: `/message/${id}/`,

    }).then((response) => getSugestoes());

  }

  // evento change em form input
  //
  function handleChange(event) {

    // object destructuring
    const { value, name } = event.target;

    /*  -------------------------------------------------------------------
        setFormSugestao   => diz respeito ao State Hook 'formSugestao'.

        ...prevSugestao   => está usando o operador Spread

        [name]: value => value será atribuído à variável cujo nome está 
                         armazenado na variável name.
        -------------------------------------------------------------------
    */

    // ---- ...prevSugestao ---  -------[name]: value------
    // { email: '', message: '', message: 'minha sugestao'}

    setFormSugestao(prevSugestao => ({ ...prevSugestao, [name]: value }));

  }

  // chamado quando a entrada 'text area' é clicada
  //
  function SugestaoMostrar() {
    setExpandido(true);
    setLinhas(3);
  }

  return (
    <div className=''>

      <form className="criar-sugestao">
        {isExpandido && <input onChange={handleChange} text={formSugestao.email} name="email" placeholder="e-mail" value={formSugestao.email} />}
        <textarea onClick={SugestaoMostrar} onChange={handleChange} name="message" placeholder="sua mensagem" rows={linhas} value={formSugestao.message} />
        {isExpandido && <button onClick={criarSugestao}>
          <AddIcon />
        </button>}
      </form>

      { sugestoes && sugestoes.map(
        sugestao => <List key={sugestao.id} id={sugestao.id} titulo={sugestao.email} mensagem={sugestao.message} exclusao={apagarSugestao} />
      )}

    </div>
  );

};

export default Sugestao;
