import React, { Component } from 'react';
import './Conversor.css'

export default class Conversor extends Component {

  API_URL = "https://free.currconv.com/api/v7/convert?apiKey=do-not-use-this-key&q="+this.props.moedaA+"_"+this.props.moedaB+"&compact=y";
  
  constructor(props) {
    super(props);
    
    this.state = {
      moedaA_valor: "",
      moedaB_valor: 0,
    }
    
    this.converter = this.converter.bind(this);
  }
  
  converter() {
    let de_para = this.props.moedaA+"_"+this.props.moedaB;

    if ( !isNaN(this.state.moedaA_valor) ) {
      fetch(this.API_URL).then(result => {
        return result.json()
      }).then(json=>{
        let cotacao = json[de_para].val;
        let moedaB_valor = (parseFloat(this.state.moedaA_valor * cotacao)).toFixed(2)
        this.setState({moedaB_valor})
      })
    } else {
      let moedaB_valor = "Valor inválido"
        this.setState({moedaB_valor})
    }

    console.log(this.state)
  }

  render() {
    return (
      <div className="conversor">
          <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
          <input className="input-value" type="text" onChange={(event) => {this.setState({moedaA_valor:event.target.value})}}></input>
          <input className="convert-button" type="button" onClick={this.converter} value="Converter"></input>
          <h2>{this.state.moedaB_valor}</h2>
      </div>
    )
  }
}
