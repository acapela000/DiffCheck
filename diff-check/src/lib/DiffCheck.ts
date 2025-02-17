


export async function checkClipboardDiff() {
  const inputText1: string = (await navigator.clipboard.readText()) || "";
  const inputText2: string = prompt("Please enter the second text:") || "";
  if (inputText1 !== inputText2) {
    return diffStrings(inputText1, inputText2);
  }
  return "";
}

function diffStrings(text1: string, text2: string): string {
  const diff: string[] = [];
  const maxLength = Math.max(text1.length, text2.length);
  for (let i = 0; i < maxLength; i++) {
    if (text1[i] !== text2[i]) {
      diff.push(
        `Difference at index ${i}: ${text1.charAt(i) || " "} vs ${
          text2.charAt(i) || " "
        }`
      );
    }
  }
  for (let i = 0; i < maxLength; i++) {
    if (text1[i] !== text2[i]) {
      diff.push(
        `Difference at index ${i}: ${text1[i] || " "} vs ${text2[i] || " "}`
      );
    }
  }
  return diff.join("\n");
}
