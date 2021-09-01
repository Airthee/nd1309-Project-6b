# Coffee supply chain

## Requirements

To deploy the contract to a public network, you need to declare some environment variables :

- MNEMONIC: The mnemonic of the account that will be used to deploy contracts.
- PROVIDER: The provider used to interract with the network.

## Libraries

- web3: To interract with the Ethereum blockchain
- ganache-cli: To run a local Ethereum node
- truffle: To simplify all contracts deployment process
- @truffle/contract: To simplify contracts usage from client side

## IPFS

Before start, you need [go-ipfs](https://github.com/ipfs/go-ipfs) installed on your computer.

### Frontent deployment

To deploy the front to the IPFS network, run the following commands :

```bash
npm run parcel:build
ipfs add -r dist/
ipfs name publish [CID of dist directory] # Optionnal, to access your content via ipns://XXXXX (address will never change)
```

Then, you can use a tool like [Pinata](https://app.pinata.cloud/) to pin your CIDs.

### TODO: Upload a Coffee Image (Farmer)

1. The frontend publishes image to IPFS network and gets the CID
2. The frontend call the `uploadImage(_upc: uint256, _cid: string)` contract's method
3. The `upload` method update the `imageUrl` attribute of the item
4. The frontend can read the image by calling the `readImage(_upc: uint256)`
5. The `readImage` method returns the `item.cid`
6. The frontend simply displays the image with `<img src="ipfs://<cid>" />`

## Informations for Udacity

Contract address: [0xe8AD052B6d69240129544C1B70d3D43B583eFE85](https://rinkeby.etherscan.io/address/0xe8AD052B6d69240129544C1B70d3D43B583eFE85)

Front hosted on IPFS Network : [ipns://k51qzi5uqu5dm5ssp4btri6pz7btytz9xz0ht96msn2ayoxk01sjsglz1k1ljz](https://k51qzi5uqu5dm5ssp4btri6pz7btytz9xz0ht96msn2ayoxk01sjsglz1k1ljz.ipns.dweb.link/)

Transactions:
* TransferOwnership - 0x9f5d77d1bc874ff84a779ed03ce6f9c72aa84a31e2e84661e584f24b3d6754a5
* Harvested - 0x2443e83eaeaf78ed091ae575ec27f392f06c376ddc8bbc66829ace28bd33fd53
* Processed - 0x90daedf6cf04e16ea7c2d7ce857e150aac0bf9610d83fe243de7c57408a4a3dc
* Packed - 0xc25c9daf310c5fdc9a266f8b301d0927ef59fe1e13e79056388686b94626420a
* ForSale - 0x464c903b1b6753d30b133c647d5a57213cf325c4f138b2388d0b878ef1ae2057
* Sold - 0x88b8d39894b0273e88895e029efeeb9db691c6b9143eea4649724611d4fdea0a
* Shipped - 0x56bfac08e117b5373d59d814de1c2affc695cbcfceba8efd47d7dfcd80c60207
* Received - 0xa64b2f4ae7e96cdb172a90e5c588a5fa966bfe895e4b45b0a44b0c8fbe09c06d
* Purchased - 0xef3407e54c626447891be072436d4cc30fb4fad9b1f48ac33bfc413f98fddcb8
