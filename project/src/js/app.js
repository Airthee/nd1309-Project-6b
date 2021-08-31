import web3 from './lib/web3';
import SupplyChain from './contracts/supplyChain';

class App {
    web3Provider = null;
    contracts = {};
    emptyAddress = "0x0000000000000000000000000000000000000000";
    sku = 0;
    upc = 0;
    metamaskAccountID = "0x0000000000000000000000000000000000000000";
    ownerID = "0x0000000000000000000000000000000000000000";
    originFarmerID = "0x0000000000000000000000000000000000000000";
    originFarmName = null;
    originFarmInformation = null;
    originFarmLatitude = null;
    originFarmLongitude = null;
    productNotes = null;
    productPrice = 0;
    distributorID = "0x0000000000000000000000000000000000000000";
    retailerID = "0x0000000000000000000000000000000000000000";
    consumerID = "0x0000000000000000000000000000000000000000";

    async init() {
        this.readForm();
        /// Setup access to blockchain
        return await this.initWeb3();
    }

    async readForm() {
        this.sku = $("#sku").val();
        this.upc = $("#upc").val();
        this.ownerID = $("#ownerID").val();
        this.originFarmerID = $("#originFarmerID").val();
        this.originFarmName = $("#originFarmName").val();
        this.originFarmInformation = $("#originFarmInformation").val();
        this.originFarmLatitude = $("#originFarmLatitude").val();
        this.originFarmLongitude = $("#originFarmLongitude").val();
        this.productNotes = $("#productNotes").val();
        this.productPrice = $("#productPrice").val();
        this.distributorID = $("#distributorID").val();
        this.retailerID = $("#retailerID").val();
        this.consumerID = $("#consumerID").val();

        console.log(
            this.sku,
            this.upc,
            this.ownerID, 
            this.originFarmerID, 
            this.originFarmName, 
            this.originFarmInformation, 
            this.originFarmLatitude, 
            this.originFarmLongitude, 
            this.productNotes, 
            this.productPrice, 
            this.distributorID, 
            this.retailerID, 
            this.consumerID
        );
    }

    async initWeb3 () {
        this.getMetaskAccountID();

        return this.initSupplyChain();
    }

    async getMetaskAccountID () {
        // Retrieving accounts
        const accounts = await web3.eth.getAccounts();
        console.log('getMetaskID:', accounts);
        this.metamaskAccountID = accounts[0];
    }

    async initSupplyChain () {
        this.contracts.SupplyChain = SupplyChain(web3.eth.givenProvider);
        
        this.fetchItemBufferOne();
        this.fetchItemBufferTwo();
        this.fetchEvents();

        return this.bindEvents();
    }

    async bindEvents () {
        $(document).on('click', this.handleButtonClick);
    }

    async handleButtonClick (event) {
        event.preventDefault();

        console.log('processId',processId);

        switch(processId) {
            case 1:
                return this.harvestItem();
            case 2:
                return this.processItem();
            case 3:
                return this.packItem();
            case 4:
                return this.sellItem();
            case 5:
                return this.buyItem();
            case 6:
                return this.shipItem();
            case 7:
                return this.receiveItem();
            case 8:
                return this.purchaseItem();
            case 9:
                return this.fetchItemBufferOne();
            case 10:
                return this.fetchItemBufferTwo();
        }
    }

    async harvestItem() {
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.harvestItem(
            this.upc, 
            this.metamaskAccountID, 
            this.originFarmName, 
            this.originFarmInformation, 
            this.originFarmLatitude, 
            this.originFarmLongitude, 
            this.productNotes
        );
        $("#ftc-item").text(result);
        console.log('harvestItem',result);
    }

    async processItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.processItem(this.upc, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('processItem',result);
    }

    async packItem () {
        const instance = await this.contracts.SupplyChain.deployed()
        const result = await instance.packItem(this.upc, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('packItem',result);
    }

    async sellItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const productPrice = web3.toWei(1, "ether");
        console.log('productPrice',productPrice);
        const result = await instance.sellItem(this.upc, this.productPrice, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('sellItem',result);
    }

    async buyItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const walletValue = web3.toWei(3, "ether");
        const result = await instance.buyItem(this.upc, {from: this.metamaskAccountID, value: walletValue});
        $("#ftc-item").text(result);
        console.log('buyItem',result);
    }

    async shipItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.shipItem(this.upc, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('shipItem',result);
    }

    async receiveItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.receiveItem(this.upc, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('receiveItem',result);
    }

    async purchaseItem () {
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.purchaseItem(this.upc, {from: this.metamaskAccountID});
        $("#ftc-item").text(result);
        console.log('purchaseItem',result);
    }

    async fetchItemBufferOne () {
        this.upc = $('#upc').val();
        console.log('upc',this.upc);

        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.fetchItemBufferOne(this.upc);
        $("#ftc-item").text(result);
        console.log('fetchItemBufferOne', result);
    }

    async fetchItemBufferTwo () {
        this.upc = $('#upc').val();
        console.log('upc',this.upc);
        
        const instance = await this.contracts.SupplyChain.deployed();
        const result = await instance.fetchItemBufferTwo.call(this.upc);
        $("#ftc-item").text(result);
        console.log('fetchItemBufferTwo', result);
    }

    async fetchEvents () {
        if (typeof this.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            this.contracts.SupplyChain.currentProvider.sendAsync = () => {
                return this.contracts.SupplyChain.currentProvider.send.apply(
                    this.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        const instance = await this.contracts.SupplyChain.deployed();
        const events = instance.allEvents(function(err, log){
            if (!err) {
                $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            }
        });
        console.log('events', events);
    }
}

$(function () {
    $(window).load(function () {
        const app = new App();
        app.init();
    });
});
