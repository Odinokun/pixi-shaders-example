// original site
// https://inculerate.com/
// video
// https://www.youtube.com/watch?v=8DH13eslS3U


//begin инициализируем pixi-контейнер canvas
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
});

app.width = window.innerWidth;
app.height = window.innerHeight;

document.body.appendChild(app.view);
//end инициализируем pixi-контейнер canvas


const container = new PIXI.Container();
const TextContainer = new PIXI.Container();
const BgContainer = new PIXI.Container();
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
  wordWrapWidth: 600
});
basicText.x = 30;
basicText.y = 90;

TextContainer.addChild(basicText);
//end new text


//begin displacement map
const displacementSprite = PIXI.Sprite.from('assets/img/displacement.png');
// const displacementSprite = PIXI.Sprite.from('assets/img/noise.png');
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

TextContainer.filters = [displacementFilter]; //применяем фильтр к контейнеру с текстом
displacementFilter.scale.x = 0.1; //сила искажения фильтра
displacementFilter.scale.y = 0.1; //сила искажения фильтра
//displacementSprite.anchor.set(0.5); //это мы позиционируем центр картинки
//end displacement map


// Listen for animate update
app.ticker.add((delta) => {
  // рендерим контейнер с фоном
  app.renderer.render(container);
});

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  tl
    //.to(displacementFilter.scale, 1, {x: 70, y: 70}) //анимируем силу искажения фильтра
    .to(displacementFilter.scale, 1, {x: 600, y: 200}) //анимируем силу искажения фильтра
    .to(basicText.position, 1, {x: 100},0) //анимируем позицию текста (0 в конце, для параллельности анимации)
    .to(basicText, 1, {alpha: 0},0); //анимируем прозрачность текста (0 в конце, для параллельности анимации)
});