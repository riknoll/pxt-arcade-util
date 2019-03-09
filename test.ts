function triggerCurveTest() {
    const enterSprite = sprites.create(image.create(80, 60));
    enterSprite.left = 0;
    enterSprite.top = 0;

    const exitSprite = sprites.create(image.create(80, 60));
    exitSprite.left = 80;
    exitSprite.top = 0;

    const enterExitSprite = sprites.create(image.create(80, 60));
    enterExitSprite.left = 0;
    enterExitSprite.top = 60;

    const anySprite = sprites.create(image.create(80, 60));
    anySprite.left = 80;
    anySprite.top = 60;

    let enterCount = 0;
    const enter = new util.TileTrigger(t => {
        enterCount++;
        enterSprite.image.fill(7)
        enterSprite.image.printCenter("" + enterCount, 30)
    }, true);
    enter.setBehavior(util.TileTriggerBehavior.TriggerOnEntrance)
    enter.setArea(new util.MapLocation(0, 0), 5, 3)
    enter.setKind(1)
    enter.start();

    let exitCount = 0;
    const exit = new util.TileTrigger(t => {
        exitCount++;
        exitSprite.image.fill(2)
        exitSprite.image.printCenter("" + exitCount, 30)
    }, true);
    exit.setBehavior(util.TileTriggerBehavior.TriggerOnExit)
    exit.setArea(new util.MapLocation(6, 0), 5, 3)
    exit.setKind(1)
    exit.start();

    let enterExitCount = 0;
    const enterExit = new util.TileTrigger(t => {
        enterExitCount++;
        enterExitSprite.image.fill(3)
        enterExitSprite.image.printCenter("" + enterExitCount, 30)
    }, true);
    enterExit.setBehavior(util.TileTriggerBehavior.TriggerOnEntranceOrExit)
    enterExit.setArea(new util.MapLocation(0, 4), 5, 3)
    enterExit.setKind(1)
    enterExit.start();


    let anyCount = 0;
    const anyt = new util.TileTrigger(t => {
        anyCount++;
        anySprite.image.fill(4)
        anySprite.image.printCenter("" + anyCount, 30)
    }, true);
    anyt.setBehavior(util.TileTriggerBehavior.TriggerOnAny)
    anyt.setArea(new util.MapLocation(6, 4), 5, 3)
    anyt.setKind(1)
    anyt.start();


    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        const s = sprites.create(sprites.castle.princess2Front, 1);
        const curve = new util.CubicBezierCurve();
        curve.setP0(0, 0)
        curve.setP1(Math.randomRange(0, 160), Math.randomRange(0, 120))
        curve.setP2(Math.randomRange(0, 160), Math.randomRange(0, 120))
        curve.setP3(160, 120)

        const anim = new util.TimingFunctionAnimation(curve, s);
        anim.onEnd(() => {
            s.destroy();
        })
        anim.start();
    })

    game.onUpdateInterval(2000, function () {
        const s = sprites.create(sprites.castle.princess2Front, 1);

        // curve.setP2(Math.randomRange(0, 160), Math.randomRange(0, 120))
        // curve.setP3(160, 120)

        const curve = new util.CubicBezierCurve();
        curve.setP0(0, 0)
        curve.setP1(Math.randomRange(0, 160), Math.randomRange(0, 120))
        curve.setP2(Math.randomRange(0, 160), Math.randomRange(0, 120))
        curve.setP3(160, 120)

        const anim = new util.TimingFunctionAnimation(curve, s);
        anim.setPeriod(2000)
        anim.onEnd(() => {
            s.destroy();
        })
        anim.start();
    })
}


function tilemapTest() {
    const tm = new util.TileMap(new util.MapData(15, 15));
    tm.data.allocate();

    for (let c = 0; c < tm.data.width; c++) {
        for (let r = 0; r < tm.data.height; r++) {
            tm.data.setTile(c, r, ((c | r) & 1) ? 1 : 2);
        }
    }
    tm.showGrid();
    tm.show();
    const c = sprites.create(img`3`);
    scene.cameraFollowSprite(c)
    controller.moveSprite(c);

    const region = tm.regions().newRegion(10, 10);
    region.setShader(new util.ColorTileShader(16, 7));
    
    

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        const sm = util.bfs(tm.data, c.x >> 4, c.y >> 4, 4, 1);
        region.setOffset(sm.left, sm.top)
        region.clear();
        util.markSearchMap(sm, region)
    })
}

tilemapTest();