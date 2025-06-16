"use strict";
const _canvas = document.getElementById("_canvas");
const _canvasLayers = {};
const _ctxs = {};
let _layer;
let ctx;
const W = parseInt(getComputedStyle(_canvas).width);
const H = parseInt(getComputedStyle(_canvas).height);
function ellipse(x, y, radiusX, radiusY, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    if (lineWidth !== undefined) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function circle(x, y, radius, color, lineWidth) {
    ellipse(x, y, radius, radius, color, lineWidth);
}
function clear(x = 0, y = 0, width = W, height = H) {
    ctx.clearRect(x, y, width, height);
}
function fill(color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
}
function getPixel(x, y) {
    return Array.from(ctx.getImageData(x, y, 1, 1).data);
}
async function fetchImages(...paths) {
    return await Promise.all(paths.map(path => new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", () => reject(new Error(`'${path}' can not be loaded`)));
        image.src = path;
    })));
}
async function fetchImage(path) {
    return (await fetchImages(path))[0];
}
function imageFromDataURL(dataURL) {
    const image = new Image();
    image.src = dataURL;
    return image;
}
function polygon(points, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i]);
    }
    ctx.closePath();
    if (lineWidth !== undefined) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function line(x1, y1, x2, y2, color = "black", lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}
function rectangle(x, y, width, height, color = "black", lineWidth) {
    if (lineWidth !== undefined) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, width, height);
    }
    else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}
function square(x, y, side, color, lineWidth) {
    rectangle(x, y, side, side, color, lineWidth);
}
function str(value) {
    if (Array.isArray(value)) {
        return "[" + value.map(item => str(item)).join(",") + "]";
    }
    else if (typeof value == "object" &&
        ((value != null && Object.getPrototypeOf(value) === Object.prototype && value.toString == Object.prototype.toString))) {
        return JSON.stringify(value);
    }
    else {
        return String(value);
    }
}
function text(value, x = 0, y = 16, fontSize = 16, color = "black") {
    ctx.font = fontSize + "px consolas,monospace";
    const _text = str(value);
    if (typeof x != "number") {
        const w = ctx.measureText(_text).width;
        switch (x[1]) {
            case "left":
                x = x[0];
                break;
            case "center":
                x = x[0] - w / 2;
                break;
            case "right":
                x = x[0] - w;
                break;
        }
    }
    if (typeof y != "number") {
        const h = ctx.measureText(_text).actualBoundingBoxAscent;
        switch (y[1]) {
            case "top":
                y = y[0] + h;
                break;
            case "center":
                y = y[0] + h / 2;
                break;
            case "bottom":
                y = y[0];
                break;
        }
    }
    ctx.fillStyle = color;
    ctx.fillText(_text, x, y);
}
function triangle(x1, y1, x2, y2, x3, y3, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    if (lineWidth !== undefined) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
const keyboard = {
    get pressed() { return Object.keys(_keys).some(value => _keys[value] === true); },
    get keyName() { return _keyName; },
    get keys() { return _keys; },
    get space() { return !!_keys["Space"]; }, set space(value) { _keys["Space"] = value; },
    get tab() { return !!_keys["Tab"]; }, set tab(value) { _keys["Tab"] = value; },
    get enter() { return !!_keys["Enter"]; }, set enter(value) { _keys["Enter"] = value; },
    get escape() { return !!_keys["Escape"]; }, set escape(value) { _keys["Escape"] = value; },
    get left() { return !!_keys["ArrowLeft"]; }, set left(value) { _keys["ArrowLeft"] = value; },
    get up() { return !!_keys["ArrowUp"]; }, set up(value) { _keys["ArrowUp"] = value; },
    get right() { return !!_keys["ArrowRight"]; }, set right(value) { _keys["ArrowRight"] = value; },
    get down() { return !!_keys["ArrowDown"]; }, set down(value) { _keys["ArrowDown"] = value; },
    get a() { return !!_keys["KeyA"]; }, set a(value) { _keys["KeyA"] = value; },
    get d() { return !!_keys["KeyD"]; }, set d(value) { _keys["KeyD"] = value; },
    get s() { return !!_keys["KeyS"]; }, set s(value) { _keys["KeyS"] = value; },
    get w() { return !!_keys["KeyW"]; }, set w(value) { _keys["KeyW"] = value; },
};
let _keyName;
let _keys = {};
_canvas.addEventListener("keydown", event => {
    event.preventDefault();
    if (_keys[event.code] !== false) {
        _keys[event.code] = true;
        _keyName = event.code;
    }
});
_canvas.addEventListener("keyup", event => {
    _keys[event.code] = null;
    switch (event.code) {
        case "ShiftLeft":
            _keys["ShiftRight"] = null;
            break;
        case "ShiftRight":
            _keys["ShiftLeft"] = null;
            break;
        case "NumpadEnter":
            _keys["Enter"] = null;
            break;
        case "Enter":
            _keys["NumpadEnter"] = null;
            break;
    }
});
window.addEventListener("blur", () => {
    _keys = {};
});
const mouse = {
    get x() { return _mouseX; },
    get y() { return _mouseY; },
    get over() { return _mouseOver; },
    get left() { return !!_buttons[0]; }, set left(value) { _buttons[0] = value; },
    get right() { return !!_buttons[2]; }, set right(value) { _buttons[2] = value; },
    get buttons() { return _buttons; }
};
let _mouseX = -1;
let _mouseY = -1;
let _mouseOver;
let _buttons = [];
_canvas.addEventListener("mousedown", event => {
    event.preventDefault();
    _canvas.focus();
    if (_buttons[event.button] !== false) {
        _buttons[event.button] = true;
    }
});
_canvas.addEventListener("mouseup", event => {
    _buttons[event.button] = null;
});
_canvas.addEventListener("mousemove", event => {
    const rect = _canvas.getBoundingClientRect();
    _mouseX = event.clientX - rect.left;
    _mouseY = event.clientY - rect.top;
    _mouseOver = true;
});
_canvas.addEventListener("mouseout", () => {
    _mouseOver = false;
    _buttons = [];
});
_canvas.addEventListener("contextmenu", event => {
    event.preventDefault();
});
_canvas.addEventListener("wheel", event => {
    event.preventDefault();
});
const touchscreen = {
    get x() { return _touches.length > 0 ? _touches[0].x : -1; },
    get y() { return _touches.length > 0 ? _touches[0].y : -1; },
    get touches() {
        return _touches;
    },
    get touched() { return _touchable && _touches.length > 0; },
    set touched(value) { _touchable = value; }
};
let _touches = [];
let _touchable = true;
function _touchHandler(event) {
    event.preventDefault();
    _canvas.focus();
    const rect = _canvas.getBoundingClientRect();
    _touches = [];
    for (let i = 0; i < event.touches.length; i++) {
        _touches[i] = {
            x: event.touches[i].clientX - rect.left,
            y: event.touches[i].clientY - rect.top,
            identifier: event.touches[i].identifier
        };
    }
    if (_touches.length == 0)
        _touchable = true;
}
_canvas.addEventListener("touchstart", _touchHandler);
_canvas.addEventListener("touchend", _touchHandler);
_canvas.addEventListener("touchmove", _touchHandler);
class Cell {
    row;
    column;
    x;
    y;
    width;
    height;
    textColor;
    _color = null;
    _image = null;
    _text = null;
    _custom = null;
    fontSize;
    tag;
    constructor(row, column, x, y, width, height, textColor) {
        this.row = row;
        this.column = column;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.textColor = textColor;
        this.fontSize = Math.min(height, width);
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.draw();
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        this.draw();
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (value == null) {
            this._text = null;
        }
        else if (typeof value == "string") {
            this._text = value;
        }
        else {
            this._text = value[0];
            this.fontSize = value[1] ?? this.fontSize;
            this.textColor = value[2] ?? this.textColor;
        }
        this.draw();
    }
    get custom() {
        return this._custom;
    }
    set custom(value) {
        this._custom = value;
        this.draw();
    }
    draw() {
        clear(this.x, this.y, this.width, this.height);
        if (this._color) {
            rectangle(this.x + 0.5, this.y + 0.5, this.width - 1, this.height - 1, this._color);
        }
        if (this._image) {
            ctx.drawImage(this._image, this.x, this.y, this.width, this.height);
        }
        if (this._text) {
            text(this._text, [this.x + this.width / 2, "center"], [this.y + this.height / 2, "center"], this.fontSize, this.textColor);
        }
        if (this._custom) {
            this._custom(this);
        }
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Grid {
    rows;
    columns;
    x;
    y;
    width;
    height;
    color;
    activatable = true;
    _activeCell;
    cells = [];
    cellWidth;
    cellHeight;
    constructor(rows, columns, x = 0, y = 0, width = W - x, height = H - y, color = "black") {
        this.rows = rows;
        this.columns = columns;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.cellWidth = (width - columns - 1) / columns;
        this.cellHeight = (height - rows - 1) / rows;
        for (let i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < columns; j++) {
                this.cells[i][j] = new Cell(i, j, x + j * (this.cellWidth + 1) + 1, y + i * (this.cellHeight + 1) + 1, this.cellWidth, this.cellHeight, color);
            }
        }
        this._activeCell = this.cells[0][0];
        this.draw();
    }
    cell(row, column) {
        return this.cells[row][column];
    }
    forEach(callback) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                callback(this.cells[i][j]);
            }
        }
    }
    get activated() {
        if (touchscreen.touched || mouse.buttons.some(value => value)) {
            if (this.activatable) {
                this.activatable = false;
                const x = touchscreen.touched ? touchscreen.x : mouse.x;
                const y = touchscreen.touched ? touchscreen.y : mouse.y;
                const cell = this.cellFromPoint(x, y);
                if (cell) {
                    this._activeCell = cell;
                    return true;
                }
            }
            return false;
        }
        this.activatable = true;
        return false;
    }
    get activeCell() {
        return this._activeCell;
    }
    cellFromPoint(x, y) {
        const column = Math.floor((x - this.x) / (this.cellWidth + 1));
        const row = Math.floor((y - this.y) / (this.cellHeight + 1));
        return this.cells[row]?.[column];
    }
    draw() {
        if (this.color) {
            rectangle(this.x, this.y, this.width, this.height, this.color);
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].draw();
            }
        }
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Button {
    text;
    color;
    textColor;
    hb;
    activatable = true;
    tag;
    constructor(text, x = 0, y = 0, width, height, color = "lightgrey", textColor = "black") {
        this.text = text;
        this.color = color;
        this.textColor = textColor;
        const w = width ?? 75;
        const h = height ?? 23;
        if (typeof x != "number") {
            switch (x[1]) {
                case "left":
                    x = x[0];
                    break;
                case "center":
                    x = x[0] - w / 2;
                    break;
                case "right":
                    x = x[0] - w;
                    break;
            }
        }
        if (typeof y != "number") {
            switch (y[1]) {
                case "top":
                    y = y[0];
                    break;
                case "center":
                    y = y[0] - h / 2;
                    break;
                case "bottom":
                    y = y[0] - h;
                    break;
            }
        }
        this.hb = new Hitbox(x, y, w, h);
        this.draw();
    }
    get activated() {
        if (touchscreen.touched || mouse.buttons.some(value => value)) {
            if (this.activatable) {
                this.activatable = false;
                const x = touchscreen.touched ? touchscreen.x : mouse.x;
                const y = touchscreen.touched ? touchscreen.y : mouse.y;
                return this.hb.contains(x, y);
            }
            return false;
        }
        this.activatable = true;
        return false;
    }
    draw() {
        rectangle(this.hb.x, this.hb.y, this.hb.width, this.hb.height, this.color);
        text(this.text, [this.hb.x + this.hb.width / 2, "center"], [this.hb.y + this.hb.height / 2, "center"], this.hb.height / 2, this.textColor);
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Hitbox {
    x;
    y;
    width;
    height;
    tag;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    intersects(other) {
        return (this.x + this.width > other.x &&
            this.x < other.x + other.width &&
            this.y + this.height > other.y &&
            this.y < other.y + other.height);
    }
    contains(x, y) {
        return (this.x + this.width > x &&
            this.x <= x &&
            this.y + this.height > y &&
            this.y <= y);
    }
    drawOutline(color = "black") {
        rectangle(this.x, this.y, Math.max(this.width, 0), Math.max(this.height, 0), color, 1);
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Sprite extends Hitbox {
    spritesheet;
    rows;
    columns;
    index = 0;
    remainingTime;
    _frames;
    frameWidth;
    frameHeight;
    sxs = [];
    sys = [];
    _finished = false;
    _framesPerSecond;
    loop = true;
    constructor(spritesheet, rows, columns) {
        super(0, 0, 0, 0);
        this.spritesheet = spritesheet;
        this.rows = rows;
        this.columns = columns;
        this._frames = array(rows * columns, i => i);
        this.framesPerSecond = 12;
        this.width = this.frameWidth = this.spritesheet.width / this.columns;
        this.height = this.frameHeight = this.spritesheet.height / this.rows;
        for (let i = 0; i < rows * columns; i += 1) {
            this.sxs[i] = this.frameWidth * (i % this.columns);
            this.sys[i] = this.frameHeight * Math.floor(i / this.columns);
        }
    }
    set frames(value) {
        if (value.length != this._frames.length || value.some((v, i) => v != this._frames[i]))
            this.index = 0;
        this._frames = value;
    }
    set framesPerSecond(value) {
        this._framesPerSecond = value;
        this.remainingTime = 1000 / value;
    }
    get framesPerSecond() {
        return this._framesPerSecond;
    }
    get finished() {
        return this._finished;
    }
    get frame() {
        return this._frames[this.index];
    }
    update() {
        this.remainingTime -= deltaTime;
        if (this.remainingTime < 0) {
            if (this.index >= this._frames.length - 1) {
                if (this.loop) {
                    this.index = 0;
                }
                else {
                    this._finished = true;
                }
            }
            else {
                this.index++;
            }
            this.remainingTime += 1000 / this._framesPerSecond;
        }
        this.draw();
    }
    draw() {
        const sx = this.sxs[this._frames[this.index]];
        const sy = this.sys[this._frames[this.index]];
        ctx.drawImage(this.spritesheet, sx, sy, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }
    getImages() {
        const frameCanvas = document.createElement("canvas");
        const frameCtx = frameCanvas.getContext("2d");
        const images = [];
        for (const frame of this._frames) {
            frameCtx.clearRect(0, 0, this.frameWidth, this.frameHeight);
            frameCtx.drawImage(this.spritesheet, this.sxs[frame], this.sys[frame], this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
            images.push(imageFromDataURL(frameCanvas.toDataURL()));
        }
        return images;
    }
}
class Turtle {
    x;
    y;
    heading;
    container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    turtle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    points = [];
    _color = "black";
    penSize = 1;
    delay = 100;
    constructor(x = W / 2, y = H / 2, heading = 0) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        document.body.appendChild(this.container);
        this.container.appendChild(this.turtle);
        this.container.setAttribute("width", "20");
        this.container.setAttribute("height", "20");
        this.container.style.position = "absolute";
        this.turtle.setAttribute("fill", this._color);
        this.turtle.setAttribute("stroke", this._color);
        this.turtle.setAttribute("stroke-width", "1");
        this.move();
        this.turn();
    }
    get state() {
        return [this.x, this.y, this.heading];
    }
    set state(value) {
        [this.x, this.y, this.heading] = value;
        this.move();
        this.turn();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.turtle.setAttribute("fill", this._color);
    }
    move() {
        const style = getComputedStyle(_canvas);
        const offsetLeft = _canvas.offsetLeft + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
        const offsetTop = _canvas.offsetTop + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop);
        this.container.style.left = (offsetLeft + this.x - 10) + "px";
        this.container.style.top = (offsetTop + this.y - 10) + "px";
        if (this.points.length > 0) {
            this.points.push([this.x, this.y]);
        }
    }
    turn() {
        const [x0, y0] = [10, 10];
        const [x1, y1] = pointFromPolar(10, this.heading + 150, x0, y0);
        const [x2, y2] = pointFromPolar(6, this.heading + 180, x0, y0);
        const [x3, y3] = pointFromPolar(10, this.heading - 150, x0, y0);
        this.turtle.setAttribute("points", `${x0},${y0} ${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    }
    async forward(length, penDown = true) {
        this.container.style.zIndex = _layer.toString();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.x += Math.cos(radians(this.heading)) * length;
        this.y += Math.sin(radians(this.heading)) * length;
        if (penDown) {
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.penSize;
            ctx.stroke();
        }
        else {
            ctx.moveTo(this.x, this.y);
        }
        this.move();
        await sleep(this.delay);
    }
    async backward(length, penDown = true) {
        this.forward(-length, penDown);
    }
    async right(degAngle = 90) {
        this.container.style.zIndex = _layer.toString();
        this.heading += degAngle;
        this.turn();
        await sleep(this.delay);
    }
    async left(degAngle = 90) {
        await this.right(-degAngle);
    }
    hide() {
        this.container.style.display = "none";
    }
    beginFill() {
        this.points = [[this.x, this.y]];
    }
    endFill() {
        polygon(this.points, this._color);
        this.points = [];
    }
    toString() {
        return JSON.stringify(this);
    }
}
addEventListener("resize", () => {
    if (_canvas.style.display == "")
        location.reload();
});
let deltaTime;
let update = () => { };
let _timestamp0;
function _updateHandler(timestamp) {
    deltaTime = timestamp - _timestamp0;
    _timestamp0 = timestamp;
    update();
    requestAnimationFrame(_updateHandler);
}
requestAnimationFrame(timestamp => _timestamp0 = timestamp);
requestAnimationFrame(_updateHandler);
function stopUpdate() {
    update = () => { };
}
function array(length, value) {
    return Array.from({ length }, (_, i) => typeof value == "function" ? value(i) : value);
}
function array2D(rows, columns, value) {
    return Array.from({ length: rows }, (_, i) => Array.from({ length: columns }, (_, j) => typeof value == "function" ? value(i, j) : value));
}
let _audioContext;
const _audioList = [];
function beep(frequency = 800, msDuration = 200, volume = 1) {
    if (!_audioContext)
        _audioContext = new AudioContext();
    return new Promise(resolve => {
        let audioItem = _audioList.find(item => item[0].frequency.value == frequency);
        if (!audioItem) {
            const oscillator = _audioContext.createOscillator();
            const gain = _audioContext.createGain();
            oscillator.connect(gain);
            oscillator.type = "square";
            gain.connect(_audioContext.destination);
            oscillator.frequency.value = frequency;
            oscillator.start();
            audioItem = [oscillator, gain];
            _audioList.push(audioItem);
            oscillator.onended = () => {
                _audioList.splice(_audioList.indexOf(audioItem), 1);
                resolve();
            };
        }
        audioItem[1].gain.value = volume;
        audioItem[0].stop(_audioContext.currentTime + msDuration / 1000);
    });
}
function char(charCode) {
    return String.fromCodePoint(charCode);
}
function charCode(char) {
    return char.codePointAt(0);
}
function degrees(radAngle) {
    return radAngle * 180 / Math.PI;
}
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
function pointFromPolar(radius, degAngle, x0 = 0, y0 = 0) {
    const a = radians(degAngle);
    return [x0 + Math.cos(a) * radius, y0 + Math.sin(a) * radius];
}
function radians(degAngle) {
    return degAngle * Math.PI / 180;
}
function rand(N) {
    return Math.floor(Math.random() * N);
}
function random(min, max, step = 1) {
    return min + Math.floor(Math.random() * Math.floor((max - min) / step + 1)) * step;
}
function randomItem(...items) {
    return items[rand(items.length)];
}
function rgba(r, g, b, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = rand(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function sleep(msDuration) {
    return new Promise(resolve => setTimeout(() => resolve(), msDuration));
}
class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPolar(length, angle) {
        return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    get length() {
        return Math.hypot(this.x, this.y);
    }
    set length(value) {
        const angle = this.angle;
        this.x = value * Math.cos(angle);
        this.y = value * Math.sin(angle);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(value) {
        const length = this.length;
        this.x = length * Math.cos(value);
        this.y = length * Math.sin(value);
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    normalize() {
        const angle = this.angle;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
    }
    toNormalized() {
        const angle = this.angle;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    adding(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    subtracting(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
    }
    multiplying(v) {
        return new Vector(this.x * v.x, this.y * v.y);
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
    }
    dividing(v) {
        return new Vector(this.x / v.x, this.y / v.y);
    }
    scale(s) {
        this.x *= s;
        this.y *= s;
    }
    toScaled(s) {
        return new Vector(this.x * s, this.y * s);
    }
    distanceTo(v) {
        return Math.hypot(this.x - v.x, this.y - v.y);
    }
    directionTo(v) {
        const angle = Math.atan2(v.y - this.y, v.x - this.x);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
_canvas.style.display = "";
_canvas.tabIndex = 0;
function setLayer(layer) {
    if (!_ctxs[layer]) {
        let canvasLayer = document.createElement("canvas");
        _canvas.append(canvasLayer);
        canvasLayer.width = W;
        canvasLayer.height = H;
        canvasLayer.style.zIndex = layer.toString();
        _canvasLayers[layer] = canvasLayer;
        _ctxs[layer] = canvasLayer.getContext("2d");
    }
    _layer = layer;
    ctx = _ctxs[_layer];
}
setLayer(0);
const _io = document.getElementById("_io");
const _params = new URL(location.href).searchParams;
const _iParam = _params.get("i");
let _inputLines = [];
let _inputLineIndex = 0;
let _outputElt;
if (_iParam != null) {
    _inputLines = decodeURIComponent(_iParam).split("\n");
}
function read(prompt = "") {
    _io.hidden = false;
    _canvas.hidden = true;
    const inputElt = document.createElement("div");
    inputElt.textContent = prompt;
    _io.append(inputElt);
    inputElt.className = "input";
    _outputElt = null;
    return new Promise((resolve) => {
        if (_inputLines[_inputLineIndex] != null) {
            let b = document.createElement("b");
            b.textContent = _inputLines[_inputLineIndex];
            inputElt.append(b);
            _io.hidden = true;
            resolve(_inputLines[_inputLineIndex++]);
        }
        else {
            const valueElt = document.createElement("b");
            inputElt.append(valueElt);
            valueElt.contentEditable = "true";
            valueElt.focus();
            inputElt.onclick = () => valueElt.focus();
            valueElt.onkeydown = event => {
                if (event.code == "Enter") {
                    event.preventDefault();
                    valueElt.contentEditable = "false";
                    _inputLines[_inputLineIndex] = valueElt.textContent;
                    _io.hidden = true;
                    _canvas.hidden = false;
                    _canvas.focus();
                    resolve(_inputLines[_inputLineIndex++]);
                }
            };
        }
    });
}
function write(value, end = "\n") {
    if (!_outputElt) {
        _outputElt = document.createElement("div");
        _io.append(_outputElt);
        _outputElt.className = "output";
        _canvas.hidden = true;
        _io.hidden = false;
    }
    _outputElt.textContent += arguments.length > 0 ? str(value) + end : "\n";
}
function clearIO() {
    _io.innerHTML = "";
    _outputElt = null;
    _canvas.hidden = false;
}
window.addEventListener("load", () => {
    const oParam = _params.get("o");
    if (oParam != null) {
        _canvas.hidden = true;
        _io.append(document.createElement("hr"));
        const respElt = document.createElement("p");
        _io.append(respElt);
        const output = _outputElt?.textContent.split("\n").map(line => line.trimEnd()).join("\n").trimEnd() ?? "";
        const oValue = decodeURIComponent(oParam);
        if (output == oValue) {
            respElt.innerHTML = `<span class="correct">${output}</span>`;
        }
        else {
            let offset = 0;
            while (output[offset] == oValue[offset]) {
                offset++;
            }
            const correct = output.slice(0, offset);
            respElt.innerHTML = `<span class="correct">${correct}</span>`;
            const incorrect = output.slice(offset) + " ".repeat(Math.max(0, oValue.length - output.length));
            respElt.innerHTML += `<span class="incorrect">${incorrect}</span>`;
            const correctElt = document.createElement("p");
            _io.append(correctElt);
            correctElt.innerHTML += `<span class="correct">${oParam}</span>`;
        }
    }
});
let _repetition = 1;
let _repetitionElt;
let _lastValue = ["", ""];
const _console = document.getElementById("_console");
window.onerror = (_event, _source, _lineno, _colno, error) => {
    _writeConsole("error", str(error));
};
const _log = console.log;
console.log = (...args) => {
    _log(...args);
    _writeConsole("log", args.map(arg => str(arg)).join(" "));
};
function _writeConsole(...value) {
    if (value[0] == _lastValue[0] && value[1] == _lastValue[1]) {
        _repetitionElt.textContent = " *" + ++_repetition;
    }
    else {
        const elt = document.createElement("div");
        _console.append(elt);
        elt.textContent = value[1];
        elt.className = value[0];
        elt.scrollIntoView();
        _repetitionElt = document.createElement("span");
        elt.append(_repetitionElt);
        _repetition = 1;
        _lastValue = value;
    }
}
function clearConsole() {
    _console.innerHTML = "";
    _lastValue = ["", ""];
}
_console.onclick = () => {
    clearConsole();
};
window.addEventListener("unhandledrejection", event => {
    throw event.reason;
});
_canvas.focus();
//# sourceMappingURL=balder.js.map