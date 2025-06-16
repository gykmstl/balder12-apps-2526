/**
* BalderJS
* version 12.0 (2025-08-    )
* Mattias Steinwall
* Baldergymnasiet, Skellefteå, Sweden
*/
declare const _canvas: HTMLDivElement;
declare const _canvasLayers: Record<number, HTMLCanvasElement>;
declare const _ctxs: Record<number, CanvasRenderingContext2D>;
declare let _layer: number;
/**
 * BalderJS
 *
 * The rendering context for the current canvas layer.
 * For customized graphics.
 * @example
 * Draw a tilted filled yellow half-ellipse:
 * ```
 * ctx.ellipse(100, 100, 100, 50, radians(45), 0, radians(180))
 * ctx.fillStyle = "yellow"
 * ctx.fill()
 * ```
 */
declare let ctx: CanvasRenderingContext2D;
/**
 * BalderJS
 *
 * Returns the width, in pixels, of the canvas. See also `H`.
 * @example
 * Draw a circle in the middle of the canvas:
 * ```
 * circle(W / 2, H / 2, 100)
 * ```
 * @example
 * Draw a line from the top left corner to the bottom right corner of the canvas.
 * ```
 * line(0, 0, W, H)
 * ```
 */
declare const W: number;
/**
 * Returns the height, in pixels, of the canvas. See also `W`.
 * @example
 * Draw a circle in the middle of the canvas:
 * ```
 * circle(W / 2, H / 2, 100)
 * ```
 * @example
 * Draw a line from the top left corner to the bottom right corner of the canvas.
 * ```
 * line(0, 0, W, H)
 * ```
*/
declare const H: number;
declare function ellipse(x: number, y: number, radiusX: number, radiusY: number, color?: string, lineWidth?: number): void;
/**
 * Draws a circle on the canvas with center in (`x`, `y`).
 * @example
 * Draw a filled circle with default color:
 * ```
 * circle(100, 50, 50)
 * ```
 * @example
 * Draw a filled red circle:
 * ```
 * circle(100, 50, 50, "red")
 * ```
 * @example
 * Draw a blue circle with a line width of 5 pixels:
 * ```
 * circle(100, 50, 50, "blue", 5)
 * ```
 */
declare function circle(x: number, y: number, radius: number, color?: string, lineWidth?: number): void;
/**
 * Clears the canvas.
 * @example
 * Clear the canvas:
 * ```
 * clear()
 * ```
 * @example
 * Clear a rectangular part of the canvas with upper left corner in (`100`, `50`):
 * ```
 * clear(100, 50, 400, 300)
 * ```
 */
declare function clear(x?: number, y?: number, width?: number, height?: number): void;
/**
 * Fills the canvas with given color.
 * @example
 * ```
 * fill("blue")
 * ```
*/
declare function fill(color?: string): void;
/**
 * Gets color information, as a 4-tuple, for a given pixel.
 * Values `r`(ed), `g`(reen), `b`(lue) and `a`(lpha) are all in the interval 0 to 255.
 * @example
 * ```
 * circle(50, 100, 30, randomItem("red", "green", "blue"))
 * text(getPixel(50, 100))
 * ```
*/
declare function getPixel(x: number, y: number): [r: number, g: number, b: number, a: number];
declare function fetchImages(...paths: string[]): Promise<HTMLImageElement[]>;
declare function fetchImage(path: string): Promise<HTMLImageElement>;
declare function imageFromDataURL(dataURL: string): HTMLImageElement;
/**
 * Draws a polygon on the canvas with edges in the `points`-array.
 * @example
 * Draw a red diamond shape:
 * ```
 * polygon([[100, 100], [140, 160], [100, 220], [60, 160]], "red")
 * ```
 */
declare function polygon(points: [x: number, y: number][], color?: string, lineWidth?: number): void;
/**
 * Draws a line on the canvas between (`x1`, `y1`) and (`x2`, `y2`).
 * @example
 * Draw two thick blue lines across the canvas:
 * ```
 * line(0, 0, W, H, "blue", 20)
 * line(0, H, W, 0, "blue", 20)
 * ```
 */
declare function line(x1: number, y1: number, x2: number, y2: number, color?: string, lineWidth?: number): void;
/**
 * Draws a rectangle on the canvas with upper left corner in (`x`, `y`).
 */
declare function rectangle(x: number, y: number, width: number, height: number, color?: string, lineWidth?: number): void;
declare function square(x: number, y: number, side: number, color?: string, lineWidth?: number): void;
declare function str(value: unknown): string;
/**
 * Draws `value` as a string on the canvas. The baseline is set by `y`.
 * @example
 * Draw 'Hello world!' with the lower left corner in (`100`, `50`):
 * ```
 * text("Hello world!", 100, 50, 36, "red")
 * ```
 * @example
 * Draw 'abcd' right-aligned to the right:
 * ```
 * text("abcd", [W, "right"])
 * ```
 * @example
 * Draw 'abcd' center-aligned to the middle:
 * ```
 * text("abcd", [W / 2, "center"])
 * ```
 */
declare function text(// 12.0
value: unknown, x?: number | [number, "left" | "center" | "right"], y?: number | [number, "top" | "center" | "bottom"], fontSize?: number, color?: string): void;
/**
 * Draws a triangle on the canvas with corners in (`x1`, `y1`), (`x2`, `y2`) and (`x3`, `y3`).
 * @example
 * Draw a triangle with corners in (`100`, `50`), (`200`, `50`) and (`200`, `150`).
 * ```
 * triangle(100, 50, 200, 50, 200, 150)
 * ```
 * @example
 * Draw a red triangle:
 * ```
 * triangle(100, 150, 200, 150, 200, 250, "red")
 * ```
 * @example
 * Draw a blue triangle with linewidth 2:
 * ```
 * triangle(100, 250, 200, 250, 200, 350, "blue", 2)
 * ```
 */
declare function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: string, lineWidth?: number): void;
/**
 * An object for keyboard input.
 *
 * @example
 * ```
 * update = () => {
 *     clear()
 *     if (keyboard.w) {
 *         text("key W")
 *     }
 * }
 * ```
 * @example
 * ```
 * update = () => {
 *     if (keyboard.keys["KeyR"]) {
 *         fill("red")
 *     }
 * }
 * ```
 */
declare const keyboard: {
    /**
     * Returns true if any key is pressed.
     * @example
     * update = () => {
     *     clear()
     *     if (keyboard.pressed) {
     *         text("Any key pressed!")
     *     }
     * }
    */
    readonly pressed: boolean;
    /**
     * Returns the standard value for the latest key pressed. It is not affected by the  keyboard layout.
      * @example
      * update = () => {
      *     clear()
      *     text(keyboard.keyName)
      * }
      */
    readonly keyName: string;
    /**
     * Returns the state of all keys.
     */
    readonly keys: Record<string, boolean | null>;
    get space(): boolean;
    set space(value: false);
    get tab(): boolean;
    set tab(value: false);
    get enter(): boolean;
    set enter(value: false);
    get escape(): boolean;
    set escape(value: false);
    get left(): boolean;
    set left(value: false);
    get up(): boolean;
    set up(value: false);
    get right(): boolean;
    set right(value: false);
    get down(): boolean;
    set down(value: false);
    get a(): boolean;
    set a(value: false);
    get d(): boolean;
    set d(value: false);
    get s(): boolean;
    set s(value: false);
    get w(): boolean;
    set w(value: false);
};
declare let _keyName: string;
declare let _keys: Record<string, boolean | null>;
/**
 * An object for input from mouse or other pointing device.
 */
declare const mouse: {
    readonly x: number;
    readonly y: number;
    readonly over: boolean;
    get left(): boolean;
    set left(value: false);
    get right(): boolean;
    set right(value: false);
    /**
     * Returns the state of all buttons.
     */
    readonly buttons: (boolean | null)[];
};
declare let _mouseX: number;
declare let _mouseY: number;
declare let _mouseOver: boolean;
declare let _buttons: (boolean | null)[];
/**
 * An object for input from touch screen.
 */
declare const touchscreen: {
    readonly x: number;
    readonly y: number;
    readonly touches: {
        readonly x: number;
        readonly y: number;
        readonly identifier: number;
    }[];
    get touched(): boolean;
    set touched(value: false);
};
declare let _touches: {
    readonly x: number;
    readonly y: number;
    readonly identifier: number;
}[];
declare let _touchable: boolean;
declare function _touchHandler(event: TouchEvent): void;
declare class Cell {
    readonly row: number;
    readonly column: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    private textColor;
    private _color;
    private _image;
    private _text;
    private _custom;
    private fontSize;
    /**
     * Additional info about this cell.
     */
    tag: any;
    constructor(row: number, column: number, x: number, y: number, width: number, height: number, textColor: string);
    get color(): string | null;
    set color(value: string | null);
    get image(): HTMLImageElement | null;
    set image(value: HTMLImageElement | null);
    get text(): string | null;
    set text(value: string | [value: string, fontSize?: number, color?: string] | null);
    get custom(): ((cell: Cell) => void) | null;
    set custom(value: ((cell: Cell) => void) | null);
    draw(): void;
    toString(): string;
}
declare class Grid {
    readonly rows: number;
    readonly columns: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    private color;
    private activatable;
    private _activeCell;
    private cells;
    private cellWidth;
    private cellHeight;
    constructor(rows: number, columns: number, x?: number, y?: number, width?: number, height?: number, color?: string);
    /**
     * Returns cell at given position.
     */
    cell(row: number, column: number): Cell;
    /**
     * Applies the `callback`-function to each cell.
     */
    forEach(callback: (c: Cell) => void): void;
    /**
     * Returns `true` if a cell was either clicked or touched.
     */
    get activated(): boolean;
    /**
     * Returns the active cell.
     */
    get activeCell(): Cell;
    /**
     * Returns the cell, if any, containing (`x`, `y`).
     */
    cellFromPoint(x: number, y: number): Cell | undefined;
    /**
     * Draws this grid.
     */
    draw(): void;
    toString(): string;
}
declare class Button {
    readonly text: string;
    private color;
    private textColor;
    private hb;
    private activatable;
    /**
    * Additional info about this button.
    */
    tag: any;
    constructor(text: string, x?: number | [number, "left" | "center" | "right"], y?: number | [number, "top" | "center" | "bottom"], width?: number, height?: number, color?: string, textColor?: string);
    get activated(): boolean;
    draw(): void;
    toString(): string;
}
declare class Hitbox {
    x: number;
    y: number;
    width: number;
    height: number;
    tag: any;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Returns `true` if this hitbox intersects `other` hibox.
     */
    intersects(other: Hitbox): boolean;
    /**
     * Returns `true` if this hitbox contains (`x`, `y`).
     */
    contains(x: number, y: number): boolean;
    drawOutline(color?: string): void;
    toString(): string;
}
declare class Sprite extends Hitbox {
    private spritesheet;
    private rows;
    private columns;
    private index;
    private remainingTime;
    private _frames;
    private frameWidth;
    private frameHeight;
    private sxs;
    private sys;
    private _finished;
    private _framesPerSecond;
    /**
     * Set to `false` if sprite shouldn't loop.
     */
    loop: boolean;
    constructor(spritesheet: HTMLImageElement, rows: number, columns: number);
    set frames(value: number[]);
    set framesPerSecond(value: number);
    get framesPerSecond(): number;
    get finished(): boolean;
    get frame(): number;
    update(): void;
    draw(): void;
    getImages(): HTMLImageElement[];
}
declare class Turtle {
    private x;
    private y;
    private heading;
    private container;
    private turtle;
    private points;
    private _color;
    penSize: number;
    /**
     * The delay, in milliseconds, between changes in state (movements and rotations).
     */
    delay: number;
    /**
     * Create a turtle.
     *
     * @example
     * Creates a turtle in the middle of the canvas, headed east (default settings):
     * ```
     * let t = new Turtle()
     * ```
     * @example
     * Creates a turtle at (`100`, `200`), headed north:
     * ```
     * let t = new Turtle(100, 200, -90)
     * ```
     *
     */
    constructor(x?: number, y?: number, heading?: number);
    /**
     * The state of the turtle as a 3-tuple.
     *
     * @example
     * Get the position and heading of turtle `t`:
     * ```
     * let [x, y, heading] = t.state
     * ```
     * @example
     * Place turtle `t` at (`100`, `200`) headed south:
     * ```
     * t.state = [100, 200, 90]
     * ```
    */
    get state(): [x: number, y: number, heading: number];
    set state(value: [x: number, y: number, heading: number]);
    /**
     * The color of this turtle. Used when drawing and filling.
     */
    get color(): string;
    set color(value: string);
    private move;
    private turn;
    /**
     * Move this turtle `length` pixels in the direction it is headed.
    */
    forward(length: number, penDown?: boolean): Promise<void>;
    /**
     * Move this turtle `length` pixels in the direction opposite it is headed.
     */
    backward(length: number, penDown?: boolean): Promise<void>;
    /**
     * Turn this turtle `degAngle` degrees clockwise.
     */
    right(degAngle?: number): Promise<void>;
    /**
     * Turn this turtle `degAngle` degrees counterclockwise.
     */
    left(degAngle?: number): Promise<void>;
    hide(): void;
    beginFill(): void;
    endFill(): void;
    toString(): string;
}
declare let deltaTime: number;
/**
 * Runs the `update`-function once for every screen update.
 * @example
 * Draw a circle at random postiton each update
 * ```
 * update = () => {
 *     circle(random(W), random(H), 10)
 * }
 * ```
 * @example
 * Count the number of updates between two space pressings.
 * ```
 * text("Press space twice.")
 * update = () => {
 *     if (keyboard.space) {
 *         keyboard.space = false
 *         let n = 0
 *
 *         update = () => {
 *             clear()
 *             n++
 *             text(n)
 *
 *             if (keyboard.space) {
 *                 update = IDLE
 *             }
 *         }
 *     }
 * }
 * ```
 */
declare let update: () => void;
declare let _timestamp0: number;
declare function _updateHandler(timestamp: number): void;
declare function stopUpdate(): void;
/**
 * Creates an array filled with `value`.
 * @example
 * Create the array `["-", "-", "-", "-", "-"]`:
 * ```
 * let a = array(5, "-")
 * ```
 */
declare function array<T>(length: number, value: Exclude<T, Function>): T[];
/**
 * Create an array filled with values returned by the `callback`-function.
 * @example
 * Create the array `[0, 2, 4, 6, 8, 10]`:
 * ```
 * let a = array(6, i => 2 * i)
 * ```
 */
declare function array<T>(length: number, callback: ((index: number) => T)): T[];
/**
 * Create a 2D-array filled with `value`.
 */
declare function array2D<T>(rows: number, columns: number, value: Exclude<T, Function>): T[][];
/**
 * Create a 2D-array filled with values returned by the `callback`-function.
 */
declare function array2D<T>(rows: number, columns: number, callback: ((rowIndex: number, columnIndex: number) => T)): T[][];
declare let _audioContext: AudioContext;
declare const _audioList: [OscillatorNode, GainNode][];
/**
 * Plays a beep. A user interaction is mandatory.
 * @example
 * Beeps for two seconds:
 * ```
 * let f = +await read("Frequency (Hz): ")
 * beep(f, 2000)
 * ```
 */
declare function beep(frequency?: number, msDuration?: number, volume?: number): Promise<void>;
/**
 * Returns the character corresponding to character code `charCode`.
 * @example
 * ```
 * write(char(65))      // A
 * ```
 */
declare function char(charCode: number): string;
/**
 * Returns the character code corresponding to character `char`.
 * @example
 * ```
 * write(charCode("A"))      // 65
 * ```
*/
declare function charCode(char: string): number | undefined;
/**
 * Returns `radAngle`, an angle in radians, to degrees.
 * @example
 * ```
 * write(degrees(Math.PI))      // 180
 * ```
 */
declare function degrees(radAngle: number): number;
/**
 *  Returns the distance between (`x1`, `y1`) and (`x2`, `y2`).
 */
declare function distance(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Returns the point with polar coordinates (`radius`, `degAngle`).
 */
declare function pointFromPolar(radius: number, degAngle: number, x0?: number, y0?: number): [x: number, y: number];
/**
 * Returns `degAngle`, an angle in degrees, to radians.
 * @example
 * ```
 * write(radians(180))      // 3.141592653589793
 * ```
 */
declare function radians(degAngle: number): number;
declare function rand(N: number): number;
/**
 * Returns a random number between `min` and `max` (both included).
 *
 * @example
 * Throw a die:
 * ```
 * let die = random(1, 6)
 * ```
*/
declare function random(min: number, max: number, step?: number): number;
/**
 * Returns a random item from `items`, the argument list.
 * @example
 * A random color:
 * ```
 * let color = randomItem("red", "green", "blue")
 * ```
 */
declare function randomItem<T>(...items: T[]): T;
/**
 * Returns a RGBA color.
 * Values `r`(ed), `g`(reen) and `b`(lue) are integers in the interval 0 to 255.
 * Value `a`(lpha) is between `0` and `1`.
 */
declare function rgba(r: number, g: number, b: number, a?: number): string;
/**
 * Shuffles `array` in place.
 */
declare function shuffle(array: unknown[]): void;
/**
 * Pauses the execution för `msDuration` ms.
 * @example
 * Show a green screen after 3 seconds:
 * ```
 * fill("red")
 * await sleep(3000)
 * fill("green")
 * ```
 */
declare function sleep(msDuration: number): Promise<void>;
declare class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static fromPolar(length: number, angle: number): Vector;
    get length(): number;
    set length(value: number);
    get angle(): number;
    set angle(value: number);
    clone(): Vector;
    normalize(): void;
    toNormalized(): Vector;
    add(v: Vector): void;
    adding(v: Vector): Vector;
    subtract(v: Vector): void;
    subtracting(v: Vector): Vector;
    multiply(v: Vector): void;
    multiplying(v: Vector): Vector;
    divide(v: Vector): void;
    dividing(v: Vector): Vector;
    scale(s: number): void;
    toScaled(s: number): Vector;
    distanceTo(v: Vector): number;
    directionTo(v: Vector): Vector;
    dot(v: Vector): number;
    toString(): string;
}
declare function setLayer(layer: number): void;
declare const _io: HTMLDivElement;
declare const _params: URLSearchParams;
declare const _iParam: string | null;
declare let _inputLines: string[];
declare let _inputLineIndex: number;
declare let _outputElt: HTMLDivElement | null;
/**
 * Writes the `prompt`, and waits for user input. Hides the canvas.
 * @example
 * ```
 * let name = await read("Your name? ")
 * ```
 */
declare function read(prompt?: string): Promise<string>;
/**
 * Writes `value` to the screen. Hides the canvas.
 *
 * @example
 * ```
 * write("On row 1.")
 * write("On row 2.")
 * ```
 * @example
 * ```
 * write("On row 1.", " ")
 * write("Also on row 1.")
 * ```
 * @example
 * ```
 * write()  // Line break
 * ```
 */
declare function write(value?: unknown, end?: "" | " " | "\t" | "\n"): void;
/**
 * Clears the `io`-element (containing user input/output).
*/
declare function clearIO(): void;
declare let _repetition: number;
declare let _repetitionElt: HTMLSpanElement;
declare let _lastValue: string[];
declare const _console: HTMLDivElement;
declare const _log: (...data: any[]) => void;
declare function _writeConsole(...value: string[]): void;
declare function clearConsole(): void;
