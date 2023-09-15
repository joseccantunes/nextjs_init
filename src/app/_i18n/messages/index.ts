import en from "./en";
import pt from "./pt";

const dictionaries = {
  ...en,
  ...pt,
};

const messages = (locale: string) => dictionaries[locale] ?? dictionaries.en;

export default messages;