let stocks = [
  { name: "หุ้น 1", price: 13 },
  { name: "หุ้น 2", price: 34 },
  { name: "หุ้น 3", price: 41 },
  { name: "หุ้น 4", price: 52 }
];
let totalMoney = 10000;
let canvasHeight = 400;
let uiStartY = canvasHeight + 50;

function setup() {
  createCanvas(800, 800);
  createUI();
  noLoop();
}

function createUI() {
  let y = uiStartY;

  stocks.forEach((stock, index) => {
    // Stock Name Input without the label
    let nameInput = createInput(stock.name, 10, y, 180, 20);

    nameInput.input(() => {
      stocks[index].name = nameInput.value();
      redraw();
    });

    // Stock Price Input without the label
    let priceInput = createInput(stock.price, 200, y, 80, 20);

    priceInput.input(() => {
      stocks[index].price = parseFloat(priceInput.value());
      redraw();
    });

    // Remove Stock Button
    let removeBtn = createButton('ลบ', 290, y);
    removeBtn.mousePressed(() => {
      stocks.splice(index, 1);
      clearUI();
      createUI();
      redraw();
    });

    y += 40;
  });

  // Add Stock Button
  let addBtn = createButton('เพิ่มหุ้น', 10, y);
  addBtn.mousePressed(() => {
    stocks.push({ name: "หุ้นใหม่", price: 10 });
    clearUI();
    createUI();
    redraw();
  });

  // Total Money Input
  let moneyInput = createInput(totalMoney, 10, y + 40, 150, 20);

  moneyInput.input(() => {
    totalMoney = parseFloat(moneyInput.value());
    redraw();
  });
}

function clearUI() {
  removeElements();
}

function draw() {
  background(250);
  drawAllocation();
}

function drawAllocation() {
  let y = 50;
  let totalWidth = width - 100;
  let textOffset = 20; // This value adjusts how far to the right the text appears

  stocks.forEach(stock => {
    let allocation = (1 / stock.price) / sum(stocks.map(s => 1 / s.price));
    let barWidth = totalWidth * allocation;
    let moneyAllocated = totalMoney * allocation;

    // Draw the bars
    fill(100, 150, 255);
    rect(50, y, barWidth, 30, 10);

    // Draw the text after the bars, showing both percentage and allocated money
    fill(0); // Black color for the text
    textAlign(LEFT, CENTER);
    text(`${stock.name} (${stock.price} บาท): ${(allocation * 100).toFixed(2)}% (${moneyAllocated.toFixed(2)} บาท)`, 60 + barWidth + textOffset, y + 15);

    y += 50;
  });

  fill(0);
  textAlign(LEFT, CENTER);
  text(`เงินรวม: ${totalMoney.toFixed(2)} บาท`, 50, y + 30);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function createInput(value, x, y, w, h) {
  let input = createInput(value);
  input.position(x, y);
  input.size(w, h);
  input.style('font-size', '16px');
  return input;
}

function createButton(txt, x, y) {
  let btn = createButton(txt);
  btn.position(x, y);
  btn.style('background-color', '#4CAF50');
  btn.style('color', 'white');
  btn.style('padding', '6px 12px');
  btn.style('border', 'none');
  btn.style('cursor', 'pointer');
  btn.style('font-size', '16px');
  btn.mouseOver(() => btn.style('background-color', '#45a049'));
  btn.mouseOut(() => btn.style('background-color', '#4CAF50'));
  return btn;
}
