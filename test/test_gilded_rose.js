var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');

function assertItem(item, name, sellIn, quality) {
  expect(item.name).to.equal(name);
  expect(item.sellIn).to.equal(sellIn);
  expect(item.quality).to.equal(quality);
}

describe("Gilded Rose", function () {

  it("should contain the same amount of items after update", function () {
    const gildedRose = new Shop([
      new Item("item1", 10, 10),
      new Item("item2", 10, 10),
      new Item("item3", 10, 10),
      new Item("item4", 10, 10),
    ]);
    expect(gildedRose.updateQuality()).to.have.lengthOf(4);
    const emptyGildedRose = new Shop();
    expect(emptyGildedRose.updateQuality()).to.have.lengthOf(0);
  });

  describe("Normal items", function () {
    it("should degrade quality by one", function () {
      const gildedRose = new Shop([new Item("normal", 10, 10)]);
      assertItem(gildedRose.updateQuality()[0], "normal", 9, 9);
    });

    it("should degrade quality twice as fast when it is passed sell in date", function () {
      const gildedRose = new Shop([new Item("normal", 0, 10)]);
      assertItem(gildedRose.updateQuality()[0], "normal", -1, 8);
    });

    it("should never degrade to negative quality", function () {
      const gildedRose = new Shop([new Item("normal", 2, 0)]);
      assertItem(gildedRose.updateQuality()[0], "normal", 1, 0);
    });
  });

  describe("Aged Brie items", function () {
    it("should actually increase in quality", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Aged Brie", 9, 11);
    });

    it("should increase in quality even past sell in and twice as fast", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Aged Brie", -1, 12);
    });

    it("should never increase to over 50 quality", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
      assertItem(gildedRose.updateQuality()[0], "Aged Brie", 9, 50);
    });
  });

  describe("Sulfuras items", function () {
    it("should never be sold or decrease in quality and is always 80", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
      assertItem(gildedRose.updateQuality()[0], "Sulfuras, Hand of Ragnaros", 10, 80);
    });
  });


  describe("Backstage items", function () {
    it("should increase in quality as concert approaches", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Backstage passes to a TAFKAL80ETC concert", 19, 11);
    });

    it("should increase by 2 in quality if concert is in 10 days or less", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Backstage passes to a TAFKAL80ETC concert", 9, 12);
    });

    it("should increase by 3 in quality if concert is in 5 days or less", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Backstage passes to a TAFKAL80ETC concert", 4, 13);
    });

    it("should drop to 0 quality if concert has passed", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Backstage passes to a TAFKAL80ETC concert", -1, 0);
    });
  });

  describe("Conjured items", function () {
    it("should degrade twice as fast in quality", function () {
      const gildedRose = new Shop([new Item("Conjured Item", 10, 10)]);
      assertItem(gildedRose.updateQuality()[0], "Conjured Item", 9, 8);
    });
  });
});
