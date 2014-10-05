Template.listTransactions.events({
  'click .add-transaction': function () {
    var newTransaction = Transactions.insert({dateTime: new Date(), type: "sale", customer:{}, items: []});
    console.log(newTransaction);
    Router.go('editTransaction', {_id: newTransaction});
  },
  
  'click .remove-transaction': function() {
    console.log(this);
    Transactions.remove({_id: this._id});
  },
  
  'click .add-customer': function () {
    Parties.insert({name: {given: chance.first(), family: chance.last()}, email: chance.email()});
  },
  
  'click .remove-customer': function() {
    console.log(this);
    Parties.remove({_id: this._id});
  },
  
  'click .add-product': function () {
    Products.insert({name: chance.word(), salePrice: chance.floating({fixed: 2, min: 0, max: 300})});
  },
  
  'click .remove-product': function() {
    console.log(this);
    Products.remove({_id: this._id});
  }
});

Template.editTransaction.events({
  'change #customer': function (event) {
    var customer = Parties.findOne({_id: event.target.value});
    Transactions.update({_id: this.transaction._id}, {$set: {customer: customer}});
  },
  
  'change #product': function (event) {
    var product = Products.findOne({_id: event.target.value});
    $("#eachPrice").val(product.salePrice);
    var itemQuantity = $("#itemQuantity").val();
    var totalPrice = product.salePrice * itemQuantity;
    $("#totalPrice").val(totalPrice);
  },
  
  'click #addItem': function(event) {
    var itemId = $("#product").val();
    var product = Products.findOne({_id: itemId});
    var itemQuantity = $("#itemQuantity").val();
    var eachPrice = $("#eachPrice").val();
    var totalPrice = $("#totalPrice").val();
    Transactions.update({_id: this.transaction._id}, {$push: {items: {id: itemId, name: product.name, quantity: itemQuantity, price: {each: eachPrice, total: totalPrice}}}});
  },
  
  'change #eachPrice': function(event) {
    var itemQuantity = $("#itemQuantity").val();
    var totalPrice = event.target.value * itemQuantity;
    $("#totalPrice").val(totalPrice);
  },
  
  'change #itemQuantity': function(event) {
    var eachPrice = $("#eachPrice").val();
    var totalPrice = event.target.value * eachPrice;
    $("#totalPrice").val(totalPrice);
  }
});

Template.editTransaction.helpers({
  isSelected: function (referenceId) {
    return this._id == referenceId;
  }
});
