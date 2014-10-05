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
    Products.insert({name: chance.word(), salePrice: chance.dollar({max: 500})});
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
  
  'click #addItem': function(event) {
    console.log(this);
    var itemName = $('#itemQuantity').value();
    var itemQuantity = $('#itemQuantity').value();
    console.log(itemName, itemQuantity);
    Transactions.update({_id: this.transaction._id}, {$push: {items: {name: itemName, quantity: itemQuantity}}});
  }
});

Template.editTransaction.helpers({
  isSelected: function (referenceId) {
    return this._id == referenceId;
  }
});
