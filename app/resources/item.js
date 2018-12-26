class Item {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = {
      currency: data.currency_id,
      amount: data.price,
      decimals: this.getDecimal(data.price),
    };
    this.permalink = data.permalink;
    this.picture = data.idPicture || data.thumbnail;
    this.condition = data.condition;
    this.free_shipping = data.shipping.free_shipping;
    this.sold_quantity = data.sold_quantity || 0;
    this.address = data.address ? data.address.city_name : '';
    this.description = data.description || '';
  }

  getDecimal(amount) {
    return parseInt(
      amount
        .toFixed(2)
        .split('.')
        .pop(),
      10,
    );
  }
}

module.exports = Item;
