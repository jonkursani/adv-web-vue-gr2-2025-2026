<script setup>
const onTypeClass = (e) => {}

const onTypeStyle = (e) => {}
</script>

<template>
  <fieldset>
    <legend>Detyra Vue Styling</legend>

    <h3>Vue Styling</h3>

    <div>
      <!-- 1) Fetch the user input and use it as a CSS class -->
      <!-- The entered class should be added to the below paragraph -->
      <input type="text" placeholder="user1, user2" @keyup.enter="onTypeClass" />
      <!-- (available classes: "user1", "user2") -->
      <p>Style me!</p>
      <button>Toggle Paragraph</button>
      <br />
      <br />

      <!-- 2) Use the "visible" and "hidden" classes to show/ hide the above paragraph -->
      <!-- Clicking the button should toggle between the two options -->

      <!-- 3) Add dynamic inline styling to the below paragraph and let the user enter a background-color -->
      <input
        type="text"
        placeholder="Write background color name ex: red, green"
        @keyup.enter="onTypeStyle"
      />
      <p>Style me inline!</p>
    </div>
  </fieldset>
</template>


<style scoped>
.user1 {
  background-color: blue;
  color: white;
}

.user2 {
  background-color: purple;
  color: white;
}

.hidden {
  display: none;
}

.visible {
  display: block;
}
</style>