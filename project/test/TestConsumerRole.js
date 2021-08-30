const ConsumerRole = artifacts.require("ConsumerRole");

contract('ConsumerRole', (accounts) => {
    it('should add consumer', async () => {
        const consumerRole = await ConsumerRole.deployed();
        expect(await consumerRole.isConsumer(accounts[2])).to.equal(false);

        let emitted = false;
        consumerRole.ConsumerAdded({}, (err, res) => {
            emitted = true;
        });

        await consumerRole.addConsumer(accounts[2]);

        expect(await consumerRole.isConsumer(accounts[2])).to.equal(true);
        expect(emitted).to.equal(true);
    })

    it('should renounce consumer', async () => {
        const consumerRole = await ConsumerRole.deployed();
        expect(await consumerRole.isConsumer(accounts[2])).to.equal(true);

        let emitted = false;
        consumerRole.ConsumerRemoved({}, (err, res) => {
            emitted = true;
        });

        await consumerRole.renounceConsumer({from: accounts[2]});

        expect(await consumerRole.isConsumer(accounts[2])).to.equal(false);
        expect(emitted).to.equal(true);
    })
});