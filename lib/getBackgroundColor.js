export const getBackgroundColor = (color) => {
  const colorPokemon = color.toLowerCase();
  switch (colorPokemon) {
    case "green":
      return "#5dbe62";
      break;
    case "red":
      return "#fc6c6d";
      break;
    case "blue":
      return "#60a5fa";
      break;
    case "yellow":
      return "#edd53e";
      break;
    case "black":
      return "#0e1f40";
      break;
    case "brown":
      return "#d78555";
      break;
    case "purple":
      return "#b563ce";
      break;
    case "gray":
      return "#9a9da1";
      break;
    case "pink":
      return "#f85888";
      break;
    case "white":
      return "#98d8d8";
      break;
    default:
      return "#cec18c";
      break;
  }
};
