import { convertLines } from "./convert-to-change-object.mjs";
import { doMagic } from "./get-diff-lines.mjs";

doMagic("c3c2657")
  //   .then((pString) => {
  //     console.log(pString);
  //     return pString;
  //   })
  .then((pString) => convertLines(pString))
  .then((pGood) => {
    console.dir(pGood, { depth: 10 });
  })
  .catch((pError) => console.error(pError));

console.log();
