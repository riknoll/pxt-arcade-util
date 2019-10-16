namespace util {
    const slopes = [img`
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
    `, img`
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
    `, img`
        c 0 0 0 0 0 0 0
        c c 0 0 0 0 0 0
        c c c 0 0 0 0 0
        c c c c 0 0 0 0
        c c c c c 0 0 0
        c c c c c c 0 0
        c c c c c c c 0
        c c c c c c c c
    `, img`
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        c c 0 0 0 0 0 0
        c c c c 0 0 0 0
        c c c c c c 0 0
        c c c c c c c c
    `, img`
        c c 0 0 0 0 0 0
        c c c c 0 0 0 0
        c c c c c c 0 0
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
    `, img`
        c c c c c c c c
        c c c c c c c 0
        c c c c c c 0 0
        c c c c c 0 0 0
        c c c c 0 0 0 0
        c c c 0 0 0 0 0
        c c 0 0 0 0 0 0
        c 0 0 0 0 0 0 0
    `, img`
        c c c c c c c c
        c c c c c c 0 0
        c c c c 0 0 0 0
        c c 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
    `, img`
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c 0 0
        c c c c 0 0 0 0
        c c 0 0 0 0 0 0
    `, img`
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
    `, img`
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
    `, img`
        0 0 0 0 0 0 0 c
        0 0 0 0 0 0 c c
        0 0 0 0 0 c c c
        0 0 0 0 c c c c
        0 0 0 c c c c c
        0 0 c c c c c c
        0 c c c c c c c
        c c c c c c c c
    `, img`
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 c c
        0 0 0 0 c c c c
        0 0 c c c c c c
        c c c c c c c c
    `, img`
        0 0 0 0 0 0 c c
        0 0 0 0 c c c c
        0 0 c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
    `, img`
        c c c c c c c c
        0 c c c c c c c
        0 0 c c c c c c
        0 0 0 c c c c c
        0 0 0 0 c c c c
        0 0 0 0 0 c c c
        0 0 0 0 0 0 c c
        0 0 0 0 0 0 0 c
    `, img`
        c c c c c c c c
        0 0 c c c c c c
        0 0 0 0 c c c c
        0 0 0 0 0 0 c c
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0
    `, img`
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        0 0 c c c c c c
        0 0 0 0 c c c c
        0 0 0 0 0 0 c c
    `];

    const elevationMap = img`
        4 4 4 4 4 4 4 4
        4 4 4 4 4 4 4 4
        8 7 6 5 4 3 2 1
        1 2 3 4 5 6 7 8
        4 4 3 3 2 2 1 1
        1 1 2 2 3 3 4 4
        8 8 7 7 6 6 5 5
        5 5 6 6 7 7 8 8
    `

    const horizontalMap = img`
        0 0 0 0 8 8 8 8
        8 8 8 8 0 0 0 0
        1 2 3 4 5 6 7 8
        0 0 0 0 2 4 6 8
        2 4 6 8 8 8 8 8
        8 7 6 5 4 3 2 1
        8 6 4 2 0 0 0 0
        8 8 8 8 8 6 4 2
    `;

    let debug: number[][] = [[], [], []];

    function initSlopes() {
        // I messed up the import so the sprites are out of order
        const remap = [0, 2, 4, 6, 8, 10, 12, 14, 1, 3, 5, 7, 9, 11, 13, 15]
        for (let i = 0; i < slopes.length; i++) {
            scene.setTile(remap[i], slopes[i], i > 0);
        }
    }
    
    class SlopePhysics extends PhysicsEngine {
        protected map: Image;
        protected sprites: Sprite[];
        protected scale: TileScale;

        constructor(map: Image, scale: TileScale) {
            super();
            this.map = map;
            this.sprites = [];
            this.scale = scale;

            scene.createRenderable(-1, function () {
                if (debug) {
                    vertLine(debug[0][0], 4)
                    vertLine(debug[0][1], 5)
                    horiLine(debug[0][2], 1)
                    // horiLine(debug[1][2], 2)
                }
            })
        }

        addSprite(sprite: Sprite) {
            this.sprites.push(sprite);
        }

        removeSprite(sprite: Sprite) {
            this.sprites.removeElement(sprite);
        }

        draw() { }

        /** Apply physics and collisions to all sprites **/
        move(dt: number) {
            const dtf = Fx.min(
                MAX_TIME_STEP,
                Fx8(dt * 1000)
            );

            const dtSec = Fx.idiv(dtf, 1000);

            for (const s of this.sprites) {
                s._vx = Fx.add(s._vx, Fx.mul(dtSec, s._ax));
                s._vy = Fx.add(s._vy, Fx.mul(dtSec, s._ay));

                this.moveSprite(s, Fx.mul(s._vx, dtSec), Fx.mul(s._vy, dtSec))
            }
        }


        /** move a single sprite **/
        moveSprite(s: Sprite, dx: Fx8, dy: Fx8) {
            const steps = 1 + Math.max(Fx.toInt(Fx.idiv(Fx.abs(dx), Math.min(s.width, 1 << this.scale))), Fx.toInt(Fx.idiv(Fx.abs(dy), Math.min(s.height, 1 << this.scale))));
            
            dx = Fx.idiv(dx, steps);
            dy = Fx.idiv(dy, steps)

            let offset: number;
            let offset2: number;
            let colAligned: number;
            let rowAligned: number;

            let yComp = Fx.compare(dy, Fx.zeroFx8);
            let xComp = Fx.compare(dx, Fx.zeroFx8);
            for (let i = 0; i < steps; i++) {
                s._x = Fx.add(dx, s._x);
                s._y = Fx.add(dy, s._y);
                
                // First check horizontal movement and bounce out of walls. Check
                // using the vertical center line of the sprite
                rowAligned = (s.y >> this.scale) << this.scale;
                
                if (xComp > 0) {
                    // Moving right
                    colAligned = (s.right >> this.scale) << this.scale;

                    offset = testRight(
                        this.map.getPixel(colAligned >> this.scale, rowAligned >> this.scale),
                        s.right - colAligned,
                        s.y - rowAligned
                    );

                    if (offset) {
                        s._x = Fx8(s.x + ((colAligned + (6 - offset)) - s.right));
                        s.vx = 0;
                        xComp = 0;
                        dx = Fx.zeroFx8;
                    }
                }
                else if (xComp < 0) {
                    // Moving left
                    colAligned = (s.left >> this.scale) << this.scale;

                    offset = testLeft(
                        this.map.getPixel(colAligned >> this.scale, rowAligned >> this.scale),
                        s.left - colAligned,
                        s.y - rowAligned
                    );

                    debug[0] = [s.left, colAligned, s.y];

                    if (offset) {
                        s._x = Fx8(s.x + ((colAligned + offset) - s.left))
                        s.vx = 0;
                        xComp = 0;
                        dx = Fx.zeroFx8;
                    }
                }

                // Next check vertical movement using the left and right sides
                if (yComp > 0) {
                    // Moving down
                    colAligned = (s.left >> this.scale) << this.scale;
                    rowAligned = ((s.bottom - 1) >> this.scale) << this.scale;

                    offset = testDownward(
                        this.map.getPixel(colAligned >> this.scale, rowAligned >> this.scale),
                        s.left - colAligned,
                        s.bottom - rowAligned
                    );

                    debug[1] = [s.left, s.bottom, rowAligned,];
                    debug[2] = [s.right - 1, s.bottom, rowAligned,];

                    colAligned = ((s.right - 1) >> this.scale) << this.scale;

                    offset2 = testDownward(
                        this.map.getPixel(colAligned >> this.scale, rowAligned >> this.scale),
                        s.right - 1 - colAligned,
                        s.bottom - rowAligned
                    );

                    if (offset || offset2) {
                        s._y = Fx8(s.y - (Math.max(offset, offset2)))
                        s.vy = 0;
                        break;
                    }
                }
            }
        }

        setMaxSpeed(speed: number) { }

        overlaps(sprite: Sprite): Sprite[] { return []; }
    }

    export function enableSlopePhysics(map: Image) {
        const engine = new SlopePhysics(map, TileScale.Eight);
        game.currentScene().physicsEngine = engine;
        scene.setTileMap(map, TileScale.Eight)
        initSlopes();
    }

    function testDownward(geometry: number, offsetX: number, offsetY: number) {
        if (offsetY < 0 || offsetX < 0 || offsetX > 7) return 0;
        switch (geometry) {
            // Empty
            case 0: return 0;
            // Solid
            case 1: 
            // Top half solid
            case 3:
            // Steep slope (top left)
            case 10: 
            // Steep slope (top right)
            case 11:
            // Slight slope (top left)
            case 12:
            // Slight slope (top right)
            case 13:
            // Slight slope (top left, lower half)
            case 14:
            // Slight slope (top right, lower half)
            case 15:
                return offsetY + 2;

            // Bottom half solid
            case 2:
            // Steep slope (bottom left)
            case 4:  
            // Steep slope (bottom right)
            case 5: 
            // Slight slope (bottom left)
            case 6: 
            // Slight slope (bottom right)
            case 7: 
            // Slight slope (bottom left, upper half)
            case 8:
            // Slight slope (bottom right, upper half)
            case 9:
                return Math.max(offsetY - (6 - elevationMap.getPixel(offsetX, geometry - 2)), 0);
        }

        return 0;
    }

    function testRight(geometry: number, offsetX: number, offsetY: number) {
        let row = 0;
        switch (geometry) {
            // Steep slope (bottom left)
            case 4:
            // Slight slope (bottom left, upper half)
            case 8:
            // Steep slope (top left)
            case 10:
            // Slight slope (top left, lower half)
            case 14:
            // Empty
            case 0:
                return 0;
            
            // Solid
            case 1:
                return 7;

            // Bottom half solid
            case 2: row = 0; break;
            // Top half solid
            case 3: row = 1; break;
            // Steep slope (bottom right)
            case 5: row = 2; break;
            // Slight slope (bottom right)
            case 7: row = 3; break;
            // Slight slope (bottom left)
            case 6: row = 0; break;
            // Slight slope (bottom right, upper half)
            case 9: row = 4; break;
            // Steep slope (top right)
            case 11: row = 5; break;
            // Slight slope (top left)
            case 12: row = 1; break;
            // Slight slope (top right)
            case 13: row = 6; break;
            // Slight slope (top right, lower half)
            case 15: row = 7; break;
        }

        return horizontalMap.getPixel(offsetY, row);
    }

    function testLeft(geometry: number, offsetX: number, offsetY: number) {
        let row = 0;
        switch (geometry) {
            // Steep slope (bottom right)
            case 5:
            // Slight slope (bottom right, upper half)
            case 9:
            // Steep slope (top right)
            case 11:
            // Slight slope (top right, lower half)
            case 15:
            // Empty
            case 0:
                return 0;

            // Solid
            case 1:
                return 7;

            // Bottom half solid
            case 2: row = 0; break;
            // Top half solid
            case 3: row = 1; break;
            // Steep slope (bottom left)
            case 4: row = 2; break;
            // Slight slope (bottom left)
            case 6: row = 3; break;
            // Slight slope (bottom right)
            case 7: row = 0; break;
            // Slight slope (bottom left, upper half)
            case 8: row = 4; break;
            // Steep slope (top left)
            case 10: row = 5; break;
            // Slight slope (top left)
            case 12: row = 6; break;
            // Slight slope (top right)
            case 13: row = 1; break;
            // Slight slope (top left, lower half)
            case 14: row = 7; break;
        }

        return horizontalMap.getPixel(offsetY, row)
    }

    function vertLine(x: number, c: number) {
        screen.fillRect(x, 0, 1, screen.height, c);
    }

    function horiLine(y: number, c: number) {
        screen.fillRect(0, y, screen.width, 1, c);
    }
} 