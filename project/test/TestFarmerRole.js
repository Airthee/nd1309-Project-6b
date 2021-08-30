const FarmerRole = artifacts.require("FarmerRole");

contract('FarmerRole', (accounts) => {
    it('should add farmer', async () => {
        const farmerRole = await FarmerRole.deployed();
        expect(await farmerRole.isFarmer(accounts[2])).to.equal(false);

        let emitted = false;
        farmerRole.FarmerAdded({}, (err, res) => {
            emitted = true;
        });

        await farmerRole.addFarmer(accounts[2]);

        expect(await farmerRole.isFarmer(accounts[2])).to.equal(true);
        expect(emitted).to.equal(true);
    })

    it('should renounce farmer', async () => {
        const farmerRole = await FarmerRole.deployed();
        expect(await farmerRole.isFarmer(accounts[2])).to.equal(true);

        let emitted = false;
        farmerRole.FarmerRemoved({}, (err, res) => {
            emitted = true;
        });

        await farmerRole.renounceFarmer({from: accounts[2]});

        expect(await farmerRole.isFarmer(accounts[2])).to.equal(false);
        expect(emitted).to.equal(true);
    })
});