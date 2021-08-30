const DistributorRole = artifacts.require("DistributorRole");

contract('DistributorRole', (accounts) => {
    it('should add distributor', async () => {
        const distributorRole = await DistributorRole.deployed();
        expect(await distributorRole.isDistributor(accounts[2])).to.equal(false);

        let emitted = false;
        distributorRole.DistributorAdded({}, (err, res) => {
            emitted = true;
        });

        await distributorRole.addDistributor(accounts[2]);

        expect(await distributorRole.isDistributor(accounts[2])).to.equal(true);
        expect(emitted).to.equal(true);
    })

    it('should renounce distributor', async () => {
        const distributorRole = await DistributorRole.deployed();
        expect(await distributorRole.isDistributor(accounts[2])).to.equal(true);

        let emitted = false;
        distributorRole.DistributorRemoved({}, (err, res) => {
            emitted = true;
        });

        await distributorRole.renounceDistributor({from: accounts[2]});

        expect(await distributorRole.isDistributor(accounts[2])).to.equal(false);
        expect(emitted).to.equal(true);
    })
});