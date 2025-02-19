// export async function diffCheck() {
//   const inputText1: string = (await navigator.clipboard.readText()) || "";
//   const inputText2: string = (await navigator.clipboard.readText()) || "";
//   if (inputText1 !== inputText2) {
//     return diffStrings(inputText1, inputText2);
//   }
//   return "";
// }
// // this function will be moved to lib
// function diffStrings(text1: string, text2: string): string {
//   text1 = text1.charAt(0);
//   text2 = text2.charAt(0);
//   const diff: any;
//   if (text1 !== text2) {
//     diff = text1.split(text2);
//     return diff;
//   }
// }
