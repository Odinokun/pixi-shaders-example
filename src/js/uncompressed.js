// original site
// https://inculerate.com/
// video
// https://www.youtube.com/watch?v=8DH13eslS3U

//https://www.pixijs.com/
//https://pixijs.io/pixi-filters/tools/demo/


//begin инициализируем pixi-контейнер canvas
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  resolution: window.devicePixelRatio || 1
});

app.width = window.innerWidth;
app.height = window.innerHeight;

document.body.appendChild(app.view);
//end инициализируем pixi-контейнер canvas


const container = new PIXI.Container();
const BgContainer = new PIXI.Container();
const TextContainer = new PIXI.Container();
app.stage.addChild(container);
app.stage.addChild(BgContainer);
app.stage.addChild(TextContainer);


//begin new texture
const bg = new PIXI.Sprite.from('assets/img/bg.jpg');
bg.width = app.screen.width;
bg.height = app.screen.height;

BgContainer.addChild(bg);
//end new texture


// begin new text
const basicText = new PIXI.Text('Odinokun`s test pixi.js', {
  fontFamily: 'Arial Narrow',
  fontSize: 100,
  fontWeight: 'bold',
  fill: '#ffffff',
  wordWrap: true,
  wordWrapWidth: 400
});
basicText.x = -600;
basicText.y = 90;
basicText.alpha = 0;

TextContainer.addChild(basicText);
//end new text


//begin displacement filter
const displacementSprite = PIXI.Sprite.from('assets/img/displacement.png');
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

TextContainer.filters = [displacementFilter]; //применяем фильтр к контейнеру с текстом

displacementFilter.scale.x = 200; //сила искажения фильтра
displacementFilter.scale.y = 300; //сила искажения фильтра
displacementSprite.anchor.set(0.15); //позиционируем центр картинки, значение 0.5 это центр
//end displacement filter

//begin shockwave filter
let shock = new PIXI.filters.ShockwaveFilter();

shock.center.x = window.innerWidth / 2;
shock.center.y = window.innerHeight / 2;
//end shockwave filter

//begin twist filter
let twist = new PIXI.filters.TwistFilter();
twist.angle = 0;
twist.radius = 0;
twist.offset = [window.innerWidth / 2, window.innerHeight / 2];
//end twist filter

//add filters
container.filters = [shock, twist];
//add containers to main container
container.addChild(BgContainer, TextContainer);


// событие при загрузке
let tl = new TimelineMax();
tl
  .to(shock, 2, {time: 3}, 0) //анимируем фильтр shockWave
  .to(displacementFilter.scale, 1, {x: 0.1, y: 0.1}, .3) //анимируем силу искажения фильтра
  .to(basicText.position, 1, {x: 100}, .3) //анимируем позицию текста (0 в конце, для параллельности анимации)
  .to(basicText, 1, {alpha: 1}, .3); //анимируем прозрачность текста (0 в конце, для параллельности анимации)


// событие по клику
document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  tl
    .to(displacementFilter.scale, 1, {x: 200, y: 300}) //анимируем силу искажения фильтра текста
    .to(basicText.position, 1, {x: 400}, 0) //анимируем позицию текста (0 в конце, для параллельности анимации)
    .to(basicText, 1, {alpha: 0}, 0) //анимируем прозрачность текста (0 в конце, для параллельности анимации)
    .to(twist, 1, {angle: -30, radius: 1000})//анимируем силу искажения фильтра Twist
    .to(twist, 1, {angle: 0, radius: 0})//анимируем силу искажения фильтра Twist
});