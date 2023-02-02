import { Types } from "./constants";
export const getData = (type, size = 4, uppercase = false) => {
  let data;
  switch (type) {
    case Types.Letters:
      data = getLetters(uppercase);
      break;
    case Types.Numbers:
      data = getNumbers();
      break;
    case Types.Icons:
      data = getIcons(uppercase);
      break;
    default:
      data = getLetters(uppercase);
      break;
  }
  let shuffled = data.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, size / 2);
  let tiles = [...selected, ...selected].sort(() => 0.5 - Math.random());
  return tiles.map((obj, index) => {
    return {
      id: index,
      name: obj,
      icon: type == Types.Icons,
    };
  });
};

const getLetters = (uppercase = false) => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) {
    letters = letters.toUpperCase();
  }
  return letters.split("");
};
const getNumbers = () => {
  return [...Array(100).keys()];
};
const getIcons = (uppercase) => {
  let icons =
    "airplane,battery,binoculars,bug,camera,cart,cloud,egg,gift,handbag,heart,house,lamp,lightbulb,sun,moon,star,wind,person,sunglases,pentagon,piggy-bank,plug,puzzle,robot, tree,trophy,truck,wallet,watch";
  if (uppercase) {
    icons = icons.toUpperCase();
  }
  return icons.split(",");
};
