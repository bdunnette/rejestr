Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function () {

  this.route('listTransactions', {
    path: '/',
    template: 'listTransactions',
    data: function () {
      var transactions = Transactions.find();
      var customers = Parties.find();
      var products = Products.find();
      return {
        transactions: transactions,
        customers: customers,
        products: products
      };
    }
  });
  
  this.route('viewTransaction', {
    path: '/t/:_id',
    template: 'viewTransaction',
    data: function () {
      var transaction = Transactions.findOne({
        _id: this.params._id
      });
      return {
        transaction: transaction
      };
    }
  });
  
  this.route('editTransaction', {
    path: '/t/:_id/edit',
    template: 'editTransaction',
    data: function () {
      var transaction = Transactions.findOne({_id: this.params._id});
      var customers = Parties.find();
      return {
        transaction: transaction,
        customers: customers
      };
    }
  });

});