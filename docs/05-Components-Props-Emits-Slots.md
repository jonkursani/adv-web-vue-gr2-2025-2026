# Lesson 05 - Components, Props, Emits, and Slots

This lesson covers only the new concepts demonstrated in the new Vue components (`UserForm.vue`, `MyComponent.vue`) that were not covered in Lessons 01-04.

---

## What We Learned

### 1. Components and Component Import

A Vue component is a reusable piece of UI defined in a `.vue` file.

#### **Creating a Component**

Any `.vue` file with `<script>`, `<template>`, and `<style>` sections is a component.

#### **Importing and Using a Component**

```js
import MyComponent from './MyComponent.vue';
import UserForm from './UserForm.vue';
```

Once imported, use it in your template like any HTML element:

```vue
<template>
  <div>
    <MyComponent />
    <UserForm />
  </div>
</template>
```

---

### 2. Props: Parent-to-Child Communication

Props allow you to pass data from a parent component to a child component.

#### **Defining Props**

Use `defineProps()` in `<script setup>` to declare which props your component accepts.

##### **Simple Array Syntax**

```js
const props = defineProps(['title', 'description']);
```

Access props in the template:

```vue
<h1>{{ title }}</h1>
<p>{{ description }}</p>
```

##### **Object Syntax with Type Checking**

```js
const props = defineProps({
    title: String,
    description: String,
    age: Number
});
```

This validates that `title` and `description` are strings, and `age` is a number.

##### **Advanced Object Syntax with Validation**

```js
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 20
    },
    post: {
        type: Object,
        required: true
    }
});
```

Options:
- `type`: Specifies the expected data type
- `required`: Whether the prop must be provided
- `default`: A default value if the prop is not provided

#### **Passing Props from Parent**

```vue
<MyComponent 
    :title="'My Post'" 
    :description="'A great post'" 
    :age="25"
/>

<!-- Or with an object -->
<MyComponent :post="{ title: 'Post Title', description: 'Content', createdAt: '2026-05-08' }" />
```

---

### 3. Emits: Child-to-Parent Communication

Emits allow a child component to send data back to its parent component.

#### **Defining Emits**

Use `defineEmits()` in `<script setup>` to declare which events your component can emit:

```js
const emit = defineEmits(['submitForm', 'readMore', 'anotherEvent']);
```

#### **Emitting Events from Child**

Call `emit()` with the event name and optional data:

```js
function handleSubmit() {
    const userData = {
        name: user.name,
        email: user.email
    };
    emit('submitForm', userData);
}
```

```vue
<button @click="handleSubmit">Submit</button>
```

Or emit directly from a template method:

```js
function readMore() {
    console.log('Read more clicked');
    const message = "Test";
    emit('readMore', message);
}
```

#### **Listening to Emits in Parent**

In the parent component, listen to emitted events using the `@` shorthand:

```vue
<UserForm @submitForm="handleUserSubmit" />
<MyComponent @readMore="handleReadMore" />
```

```js
function handleUserSubmit(userData) {
    console.log('Form submitted:', userData);
}

function handleReadMore(message) {
    console.log('Read more clicked with message:', message);
}
```

---

### 4. Slots: Providing Content Placeholders

Slots allow you to pass content from a parent component into a child component's template.

#### **Default Slot**

The child component defines where content should go:

```vue
<!-- MyComponent.vue -->
<template>
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
    
    <!-- Placeholder for parent content -->
    <slot />
</template>
```

The parent component passes content that fills the slot:

```vue
<!-- Parent.vue -->
<MyComponent :post="postData">
    <p>This content goes into the default slot</p>
    <button>Learn More</button>
</MyComponent>
```

Result in the DOM:

```html
<h1>Post Title</h1>
<p>Post Description</p>
<p>This content goes into the default slot</p>
<button>Learn More</button>
```

#### **Named Slots**

Use multiple named slots for different content areas.

Child component defines named slots:

```vue
<!-- MyComponent.vue -->
<template>
    <div class="card">
        <slot name="header" />
        <slot />  <!-- Default slot -->
        <slot name="footer" />
    </div>
</template>
```

Parent provides content for each slot:

```vue
<!-- Parent.vue -->
<MyComponent>
    <!-- Content for named slot "header" -->
    <template #header>
        <h2>Header Content</h2>
    </template>

    <!-- Content for default slot -->
    <p>Default slot content</p>

    <!-- Content for named slot "footer" -->
    <template #footer>
        <p>Footer content</p>
    </template>
</MyComponent>
```

The `#slotName` syntax is shorthand for `v-slot:slotName`.

#### **Practical Example**

Child component with multiple slots:

```vue
<!-- UserForm.vue -->
<template>
    <form @submit.prevent="handleSubmit">
        <!-- Header slot for title -->
        <slot name="header">
            <h1>{{ isEdit ? 'Edit User' : 'Add User' }}</h1>
        </slot>

        <!-- Default slot for form fields -->
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="user.name" />
        </div>
        
        <!-- Footer slot for buttons -->
        <slot name="footer">
            <button type="submit">Submit</button>
        </slot>
    </form>
</template>
```

Parent uses the form with custom content:

```vue
<UserForm @submitForm="handleSubmit">
    <template #header>
        <h1>Create New User</h1>
    </template>

    <p>Please fill in all fields</p>

    <template #footer>
        <button type="submit">Save User</button>
        <button type="button" @click="reset">Reset</button>
    </template>
</UserForm>
```

---

## Full Component Communication Example

Here's how props, emits, and slots work together:

**Child Component (UserForm.vue):**

```js
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submitForm']);

const user = reactive({
    name: '',
    email: '',
    isActive: true
});

function handleSubmit() {
    emit('submitForm', user);
}
```

**Parent Component:**

```js
import UserForm from './UserForm.vue';

function handleUserSubmit(userData) {
    console.log('User submitted:', userData);
}
```

```vue
<UserForm 
    :isEdit="false" 
    @submitForm="handleUserSubmit"
>
    <p>Fill in the form below</p>
</UserForm>
```

---

## Quick Reference

| Feature | Purpose | Example |
|---------|---------|---------|
| **defineProps** | Declare props from parent | `defineProps({ title: String })` |
| **Props validation** | Type-check and require props | `required: true, default: 'value'` |
| **defineEmits** | Declare events for parent | `defineEmits(['submit'])` |
| **emit()** | Send data to parent | `emit('submit', data)` |
| **@eventName** | Listen to child events | `@submitForm="handler"` |
| **\<slot\>** | Default content placeholder | `<slot />` |
| **Named slots** | Multiple content areas | `<slot name="header" />` |
| **#slotName** | Provide named slot content | `<template #header>` |

---

## Key Takeaways

1. **Props** pass data down from parent to child
2. **Emits** send data up from child to parent
3. **Slots** allow parent components to customize child content
4. Props should be validated for better type safety
5. Components are the building blocks of Vue applications
6. Use named slots when you need multiple content areas
