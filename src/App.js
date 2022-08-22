import * as Covalent from './Covalent';

function App() {

  async function process() {
    let dexes =  await Covalent.getXYTransactions('1', 'uniswap_v2', '0x5395cfB36dE59A9a2D938142b038bE2e9Ecc45cc');
    console.log('DEXs', dexes);
  }
  
  return (
    <div className="container py-5">
      <h1>Uniswap history</h1>
      <button onClick={process}>
        DEXes
      </button>
    </div>
  );
}

export default App;
