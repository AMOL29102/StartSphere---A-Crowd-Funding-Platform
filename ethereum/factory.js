import web3  from "./web3";
import Factory from "./build/Factory.json"

const instance = new web3.eth.Contract(
    Factory.abi , '0x7F247Ba5B1A1134D0f40F5feB2AfCdDC188b11a1'
)

export default instance ;