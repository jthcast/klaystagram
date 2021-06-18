import caver from './caver'

const KlaystagramContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default KlaystagramContract