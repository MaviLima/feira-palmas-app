import React, {useState} from 'react'

import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css'

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function NewIncident(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  
  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e){
    e.preventDefault()

    const data = {title, description, value}

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    } catch(err){
      alert('Não foi possível cadastrar novo produto, tente novamente.')
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
        <img className="logo" src={logoImg} alt="Be The Hero"/>

        <h1>Cadastrar novo produto</h1>
        <p>Descreva o produto</p>

        <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o início
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Nome do produto" value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}