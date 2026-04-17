// src/utils/preloadImages.ts
import cleanImg from '/images/pets/CLEAN.png';
import bossImg from '/images/pets/BOSS.png';
import monkImg from '/images/pets/MONK.png';
import soulImg from '/images/pets/SOUL.png';
import okbjImg from '/images/pets/OKBJ.png';
import sexyImg from '/images/pets/SEXY.png';
import luckImg from '/images/pets/LUCK.png';
import hugsImg from '/images/pets/HUGS.png';
import foodImg from '/images/pets/FOOD.png';
import gogoImg from '/images/pets/GOGO.png';
import wocImg from '/images/pets/WOC.png';
import smallzImg from '/images/pets/SMALLZ.png';
import ctrlImg from '/images/pets/CTRL.png';
import thankImg from '/images/pets/THANK.png';
import atmImg from '/images/pets/ATM.png';
import loverImg from '/images/pets/LOVER.png';

export const petImages = {
  CLEAN: cleanImg,
  BOSS: bossImg,
  MONK: monkImg,
  SOUL: soulImg,
  OKBJ: okbjImg,
  SEXY: sexyImg,
  LUCK: luckImg,
  HUGS: hugsImg,
  FOOD: foodImg,
  GOGO: gogoImg,
  WOC: wocImg,
  SMALLZ: smallzImg,
  CTRL: ctrlImg,
  THANK: thankImg,
  ATM: atmImg,
  LOVER: loverImg
};

export const preloadAllPetImags = () =>{
    Object.values(petImages).forEach(src => {
        const img = new Image();
        img.src = src;
    });
};