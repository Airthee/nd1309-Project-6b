import contractArtifact from '../../../build/contracts/SupplyChain.json';

export default function (provider) {
    const SupplyChainContract = TruffleContract(contractArtifact);
    SupplyChainContract.setProvider(provider);
    return SupplyChainContract;
}