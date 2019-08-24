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
app.stage.addChild(container);


// Create a new texture
const bg = new PIXI.Sprite.from('assets/img/bg.jpg');
bg.width = app.screen.width;
bg.height = app.screen.height;

container.addChild(bg);


// Create a new text
const basicText = new PIXI.Text('Odinokun`s test pixi.js', {
  fontFamily: 'Arial Narrow',
  fontSize: 120,
  fontWeight: 'bold',
  fill: '#ffffff',
  wordWrap: true,
  wordWrapWidth: 600
});
basicText.x = 30;
basicText.y = 90;

container.addChild(basicText);


// Listen for animate update
app.ticker.add((delta) => {
  // рендерим контейнер с фоном
  app.renderer.render(container);
});