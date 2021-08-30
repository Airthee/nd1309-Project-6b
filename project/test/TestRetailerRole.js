const RetailerRole = artifacts.require("RetailerRole");

contract('RetailerRole', (accounts) => {
    it('should add retailer', async () => {
        const retailerRole = await RetailerRole.deployed();
        expect(await retailerRole.isRetailer(accounts[2])).to.equal(false);

        let emitted = false;
        retailerRole.RetailerAdded({}, (err, res) => {
            emitted = true;
        });

        await retailerRole.addRetailer(accounts[2]);

        expect(await retailerRole.isRetailer(accounts[2])).to.equal(true);
        expect(emitted).to.equal(true);
    })

    it('should renounce retailer', async () => {
        const retailerRole = await RetailerRole.deployed();
        expect(await retailerRole.isRetailer(accounts[2])).to.equal(true);

        let emitted = false;
        retailerRole.RetailerRemoved({}, (err, res) => {
            emitted = true;
        });

        await retailerRole.renounceRetailer({from: accounts[2]});

        expect(await retailerRole.isRetailer(accounts[2])).to.equal(false);
        expect(emitted).to.equal(true);
    })
});