import React from 'react';
import * as Covalent from './Covalent';
import * as Unstoppable from './Unstoppable.js';
import { ethers } from "ethers";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.process = this.process.bind(this);
    this.formatTokenValue = this.formatTokenValue.bind(this);
    this.state = { searching: false,  result: false, txList: []  };
  }

  round(value, precision = 5) {
    return Number(value).toFixed(precision);
  }

  formatTokenValue(value, decimals = '18') {
    let bigNumberValue = ethers.utils.parseUnits(value, 0);
    return this.round(ethers.utils.formatUnits(bigNumberValue, decimals), 3);
  }
  
  async process(e) {
    e.preventDefault();

    let domain = document.getElementById('input-search').value;
    if (!domain) return;

    this.setState({ searching: true, result: false });

    Unstoppable.getDomainInfo(domain).then(domainInfo => {
      let address = domainInfo.meta.owner;
      if (!address) throw 'domain not found';
      console.log('adress', address);
      return Covalent.getXYTransactions('56', 'pancakeswap_v2', address);
    }).then(tx => {
      console.log('tx', tx);
      this.setState({txList: tx.data.items });
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      this.setState({searching: false, result: true });
    });

  }

  render() {
    return (
      <div className="container py-5">
      <h1 id="title" className="display-1 mb-4">Pancakeswap History</h1>
      <p className='fs-3 text-muted mb-4'>Display your Pancakeswap transactions history.</p>
      <form onSubmit={this.process} className='mb-5'>
      <div className="mb-4">
        <input type="text" id="input-search" className="form-control" placeholder="Unstoppable domain name" autoComplete="off"/>
      </div>
      <button type="submit" className="btn btn-dark">Show history</button>
      {this.state.searching &&
      <div className='my-4'><span className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </span></div>
      } 
    </form>
    {this.state.result &&
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Act</th>
          <th scope="col">Token 0</th>
          <th scope="col">Token 1</th>
          <th scope="col">Amount 0 IN</th>
          <th scope="col">Amount 0 OUT</th>
          <th scope="col">Amount 1 IN</th>
          <th scope="col">Amount 1 OUT</th>
        </tr>
      </thead>
      <tbody>
        { this.state.txList.map((tx, index) => 
          <tr key={index}>
            <td>{ tx.block_signed_at }</td>
            <td className='' style={{ width: '4rem' }}>{ tx.act }</td>
            <td>{ tx.token_0.contract_ticker_symbol }</td>
            <td className=''>{ tx.token_1.contract_ticker_symbol }</td>
            <td>{ this.formatTokenValue(tx.amount_0_in) }</td>
            <td>{ this.formatTokenValue(tx.amount_0_out) }</td>
            <td>{ this.formatTokenValue(tx.amount_1_in) }</td>
            <td>{ this.formatTokenValue(tx.amount_1_out) }</td>
          </tr>
          ) }
      </tbody>
    </table>
    } 
    </div>
    );
  }
}


export default App;
