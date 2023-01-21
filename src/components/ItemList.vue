<script lang="ts" setup>

const {icon, title, description, rightText} = defineProps({
  icon: String,
  title: String,
  description: String,
  rightText: String,
});
</script>

<template>
  <FlexboxLayout class="justify-between">
    <FlexboxLayout>
      <Image :src="icon" stretch="fill"
             class="h-[50] w-[50] rounded-full"></Image>
      <StackLayout class="ml-2">
        <Label :text="title" class="text-md"></Label>
        <Label :text="description" class="mt-2 text-left"></Label>
      </StackLayout>
    </FlexboxLayout>
    <StackLayout>
      <Label :text="rightText" class="text-right text-lg"></Label>
    </StackLayout>
  </FlexboxLayout>
</template>

