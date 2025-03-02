<template>
  <div class="diff-container">
    <textarea v-model="textA" placeholder="Paste Paragraph A"></textarea>
    <textarea v-model="textB" placeholder="Paste Paragraph B"></textarea>

    <label>
      <input type="checkbox" v-model="isWordDiff" />
      Compare by words
    </label>

    <div class="result">
      <h3>Differences:</h3>
      <p v-html="highlightedDiff"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { diffWords, diffChars } from "diff"; // Using the 'diff' library

export default defineComponent({
  setup() {
    const textA = ref("");
    const textB = ref("");
    const isWordDiff = ref(true); // Checkbox to toggle word/char diff

    const highlightedDiff = computed(() => {
      if (!textA.value || !textB.value) return ""; // Prevent errors on empty input

      const diffFn = isWordDiff.value ? diffWords : diffChars;
      const diffs = diffFn(textA.value, textB.value);

      return diffs
        .map((part) => {
          if (part.added) return `<span class="added">${part.value}</span>`;
          if (part.removed) return `<span class="removed">${part.value}</span>`;
          return part.value;
        })
        .join(""); // Join to form the final HTML output
    });

    return { textA, textB, isWordDiff, highlightedDiff };
  },
});
</script>

<style scoped>
.diff-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  margin: auto;
}
textarea {
  width: 100%;
  height: 100px;
  font-size: 16px;
}
.added {
  background-color: #d4fcbc; /* Light green for added text */
}
.removed {
  background-color: #ffcccc; /* Light red for removed text */
}
.result {
  border: 1px solid #ddd;
  padding: 10px;
  background: #f9f9f9;
}
</style>
