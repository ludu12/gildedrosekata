class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function normalUpdate(item) {
  if (item.sellIn <= 0) {
    item.quality--;
  }
  item.sellIn--;
  if (item.quality > 0) {
    item.quality--;
  }
  return item;
}

function agedBrieUpdate(item) {
  if (item.sellIn <= 0) {
    item.quality++;
  }
  item.sellIn--;
  if (item.quality < 50) {
    item.quality++;
  }
  return item;
}

function backstageUpdate(item) {
  item.quality++;
  if (item.sellIn <= 10) {
    item.quality++;
  }
  if (item.sellIn <= 5) {
    item.quality++;
  }
  if (item.sellIn <= 0) {
    item.quality = 0;
  }
  item.sellIn--;
  return item;
}

function conjuredUpdate(item) {
  if (item.sellIn <= 0) {
    item.quality = item.quality - 2;
  }
  item.sellIn--;
  if (item.quality > 0) {
    item.quality = item.quality - 2;
  }
  return item;
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {

      switch (item.name) {
        case "Aged Brie":
          item = agedBrieUpdate(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item = backstageUpdate(item);
          break;
        case "Conjured Item":
          item = conjuredUpdate(item);
          break;
        default:
          item = normalUpdate(item);
      }
    });
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
