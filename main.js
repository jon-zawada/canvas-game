import { resouces } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import './style.css'

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resouces.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resouces.images.ground,
  frameSize: new Vector2(320, 180),
})

const hero = new Sprite({
  resource: resouces.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1
})

const shadow = new Sprite({
  resource: resouces.images.shadow,
  frameSize: new Vector2(32, 32)
})

const heroPos = new Vector2(16 * 6, 16 * 5);

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Center the Hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPostY = heroPos.y + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPostY)
  hero.drawImage(ctx, heroPosX, heroPostY);
}

setInterval(() => {
  hero.frame += 1;
  if(hero.frame > 24) {
    hero.frame = 0;
  }
  draw();
}, 300);

