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
Front hosted on IPFS Network : [ipns://k51qzi5uqu5dm5ssp4btri6pz7btytz9xz0ht96msn2ayoxk01sjsglz1k1ljz](ipns://k51qzi5uqu5dm5ssp4btri6pz7btytz9xz0ht96msn2ayoxk01sjsglz1k1ljz)
