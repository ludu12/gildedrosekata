class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function normalUpdate(item){
  if (item.sellIn <= 0) {
    item.quality--;
  }
  item.sellIn--;
  if (item.quality > 0) {
    item.quality--;
  }
  return item;
}

function agedBrieUpdate(item){
  if (item.sellIn <= 0) {
    item.quality++;
  }
  item.sellIn--;
  if (item.quality < 50) {
    item.quality++;
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
        default:
          item = normalUpdate(item);
      }

      // if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      //   if (item.quality > 0) {
      //     if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //       item.quality = item.quality - 1;
      //     }
      //   }
      // } else {
      //   if (item.quality < 50) {
      //     item.quality = item.quality + 1;
      //     if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (item.sellIn < 11) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1;
      //         }
      //       }
      //       if (item.sellIn < 6) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1;
      //         }
      //       }
      //     }
      //   }
      // }
      // if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //   item.sellIn = item.sellIn - 1;
      // }
      // if (item.sellIn < 0) {
      //   if (item.name != 'Aged Brie') {
      //     if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (item.quality > 0) {
      //         if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //           item.quality = item.quality - 1;
      //         }
      //       }
      //     } else {
      //       item.quality = item.quality - item.quality;
      //     }
      //   } else {
      //     if (item.quality < 50) {
      //       item.quality = item.quality + 1;
      //     }
      //   }
      // }
    });
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
