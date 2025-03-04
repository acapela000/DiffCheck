export function diffStrings(text1: string, text2: string): string {
  text1 = text1.charAt(0);
  text2 = text2.charAt(0);
  let diff: any;
  if (text1 !== text2) {
    diff = text1.split(text2);
    return diff;
  }
  return "";
}
