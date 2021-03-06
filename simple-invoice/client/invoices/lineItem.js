Template.lineItem.onCreated(function() {
  this.newFieldCreated = new ReactiveVar(false);
});

Template.lineItem.helpers({ 
  lineItemPrice:function() {
    var display;
    var totalPrice = this.price * this.quantity;
    if(totalPrice > 0) {
      display = accounting.formatMoney(totalPrice);
    } else {
      display = accounting.formatMoney(0)
    }
    return display;
  },
  moreThanOneLineItem:function() {
    return this.quantity && this.price && this.description && LineItems.find({}).count() > 1;
  }
}); 

Template.lineItem.events({ 
  // some event that adds the line item to a client side line item collection
  "keyup [name=itemPrice]": function(event, template){ 
    LineItems.update(this._id, {$set: {price: event.target.value}});
  },
  "keyup [name=itemQuantity]": function(event, template){ 
    LineItems.update(this._id, {$set: {quantity: event.target.value}});
  },
  "keyup [name=itemDescription]": function(event, template) {
    LineItems.update(this._id, {$set: {description: event.target.value}});
  },
  "keyup input": function(event, template) {
    if(!template.newFieldCreated.get() && this.quantity && this.price && this.description) {
      template.newFieldCreated.set(true);
      LineItems.insert({});
    }
  },
  "click .remove-line-item":function(event, template) {
    LineItems.remove(this._id);
  }
}); 
