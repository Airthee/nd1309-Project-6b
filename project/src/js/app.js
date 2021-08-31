import web3 from "./lib/web3";
import SupplyChain from "./contracts/supplyChain";

import "../styles/app.css";

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

  readForm() {
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

  async initWeb3() {
    this.getMetaskAccountID();

    return this.initSupplyChain();
  }

  async getMetaskAccountID() {
    // Retrieving accounts
    const accounts = await web3.eth.getAccounts();
    console.log("getMetaskID:", accounts);
    this.metamaskAccountID = accounts[0];
  }

  async initSupplyChain() {
    this.contracts.SupplyChain = SupplyChain(web3.eth.givenProvider);

    await Promise.all([
      this.fetchItemBufferOne(),
      this.fetchItemBufferTwo(),
      this.fetchEvents(),
    ]);

    return this.bindEvents();
  }

  bindEvents() {
    $(document).on("click", this.handleButtonClick.bind(this));
  }

  async handleButtonClick(event) {
    event.preventDefault();
    this.readForm();

    const buttonId = event.target.id;
    const matchingMethods = {
      "button-harvest": "harvestItem",
      "button-process": "processItem",
      "button-pack": "packItem",
      "button-forsale": "sellItem",
      "button-buy": "buyItem",
      "button-ship": "shipItem",
      "button-receive": "receiveItem",
      "button-purchase": "purchaseItem",
      "button-fetch1": "fetchItemBufferOne",
      "button-fetch2": "fetchItemBufferTwo",
      // "button-refresh-history": "fetchEvents",
    };
    const methodToUse = matchingMethods[buttonId];
    if (!methodToUse) {
      console.warning(`No method for button "${buttonId}"`);
    } else {
      return this[methodToUse]();
    }
  }

  async harvestItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.harvestItem(
      this.upc,
      this.originFarmerID,
      this.originFarmName,
      this.originFarmInformation,
      this.originFarmLatitude,
      this.originFarmLongitude,
      this.productNotes,
      { from: this.originFarmerID }
    );
    this.setFtcItem(result);
    console.log("harvestItem", result);
  }

  async processItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.processItem(this.upc, {
      from: this.originFarmerID,
    });
    this.setFtcItem(result);
    console.log("processItem", result);
  }

  async packItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.packItem(this.upc, {
      from: this.originFarmerID,
    });
    this.setFtcItem(result);
    console.log("packItem", result);
  }

  async sellItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const productPrice = web3.utils.toWei(this.productPrice, "ether");
    console.log("productPrice", productPrice);
    const result = await instance.sellItem(this.upc, productPrice, {
      from: this.originFarmerID,
    });
    this.setFtcItem(result);
    console.log("sellItem", result);
  }

  async buyItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const walletValue = web3.utils.toWei(this.productPrice, "ether");
    const result = await instance.buyItem(this.upc, {
      from: this.distributorID,
      value: walletValue,
    });
    this.setFtcItem(result);
    console.log("buyItem", result);
  }

  async shipItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.shipItem(this.upc, {
      from: this.distributorID,
    });
    this.setFtcItem(result);
    console.log("shipItem", result);
  }

  async receiveItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.receiveItem(this.upc, {
      from: this.retailerID,
    });
    this.setFtcItem(result);
    console.log("receiveItem", result);
  }

  async purchaseItem() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.purchaseItem(this.upc, {
      from: this.consumerID,
    });
    this.setFtcItem(result);
    console.log("purchaseItem", result);
  }

  async fetchItemBufferOne() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.fetchItemBufferOne(this.upc);
    this.setFtcItem(result);
    console.log("fetchItemBufferOne", result);
  }

  async fetchItemBufferTwo() {
    const instance = await this.contracts.SupplyChain.deployed();
    const result = await instance.fetchItemBufferTwo.call(this.upc);
    this.setFtcItem(result);
    console.log("fetchItemBufferTwo", result);
  }

  async fetchEvents() {
    const self = this;

    if (
      typeof this.contracts.SupplyChain.currentProvider.sendAsync !== "function"
    ) {
      this.contracts.SupplyChain.currentProvider.sendAsync = function () {
        return this.contracts.SupplyChain.currentProvider.send.apply(
          self.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    const addEvent = (log) => {
      $("#ftc-events").append(
        "<li>" + log.event + " - " + log.transactionHash + "</li>"
      );
    };

    const instance = await this.contracts.SupplyChain.deployed();

    // Fetch all passed events
    $("#ftc-events").html("");
    const events = await instance.getPastEvents("allEvents", {
      fromBlock: 0,
    });
    events.forEach((log) => {
      addEvent(log);
    });

    // On new event, add it to the list
    instance.allEvents({}, (err, log) => {
      console.log("new event", log);
      if (!err) {
        addEvent(log);
      }
    });
  }

  setFtcItem(newItem) {
    let content = "";
    console.log(newItem);
    for (const [attribute, value] of Object.entries(newItem)) {
      let stringValue = value;
      if (attribute === "itemState") {
        stringValue = `${this.stringifyState(value)} (${value})`;
      } else if (typeof value === "object") {
        stringValue = JSON.stringify(value);
      }
      content += `${attribute}: ${stringValue}\n`;
    }
    document.getElementById("ftc-item").innerHTML = content;
  }

  stringifyState(stateId) {
    const matchingStates = {
      0: "Harvested",
      1: "Processed",
      2: "Packed",
      3: "ForSale",
      4: "Sold",
      5: "Shipped",
      6: "Received",
      7: "Purchased",
    };
    return matchingStates[stateId];
  }
}

$(function () {
  $(window).load(function () {
    const app = new App();
    app.init();
  });
});
