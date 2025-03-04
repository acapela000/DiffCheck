import { diffStrings } from './diffStrings';

export async function diffCheck() {
  const inputText1: string = (await navigator.clipboard.readText()) || "";
  const inputText2: string = (await navigator.clipboard.readText()) || "";
  if (inputText1 !== inputText2) {
    return diffStrings(inputText1, inputText2);
  }
  return "";
}
