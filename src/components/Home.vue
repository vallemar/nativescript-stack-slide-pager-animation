<script lang="ts" setup>

import {Pager as NSPager} from "@nativescript-community/ui-pager";
import {computed, ref, toRaw} from "vue";
import {isAndroid, View} from "@nativescript/core";
import {dataAccounts, dataInversions} from "~/data";
import ItemList from "~/components/ItemList.vue";
import {StackSlideTransformation} from "~/StackSlideTransformation.android";

const refContentView = ref();
const currentCard = ref(0);
const accounts = ref(dataAccounts);
const inversions = ref(dataInversions);
const currentAccount = computed(() => accounts.value[currentCard.value]);
const lastTransaction = computed(() => currentAccount.value.transactions[0]);
const onChangeSelected = (args: any) => {
  const orientation = currentCard.value < args.value ? 300 : -300
  currentCard.value = args.value;
  const view = (toRaw(refContentView.value.nativeView) as View);
  view.opacity = 0.1;
  view.translateX = orientation;

  view.animate({
    opacity: 1,
    translate: {
      y: 0,
      x: 0
    },
    duration: 300
  });
}


function loadedPager(args: { object: any }) {
  if (isAndroid) {
    args.object.transformers = {};
    const viewPager: androidx.viewpager2.widget.ViewPager2 = (args.object as NSPager).nativeView.getChildAt(0);
    viewPager.setPageTransformer(new StackSlideTransformation());
  }
}
</script>

<template>
  <Frame>
    <Page actionBarHidden="true"
          androidStatusBarBackground="#171E26"
          class="bg-[#171E26]">
      <ScrollView>
        <StackLayout class="page py-3">
          <FlexboxLayout class="justify-between items-center px-3">
            <FlexboxLayout class="h-[45] w-[45] justify-center items-center bg-[#F0B90B] rounded-full">
              <Label text="V" class="text-xl text-center  text-white  "></Label>
            </FlexboxLayout>

            <StackLayout orientation="horizontal">
              <Label text="equalizer" class="m-icon-round"></Label>
              <Label text="star" class="m-icon-round mx-3"></Label>
              <Label text="notifications" class="m-icon-round"></Label>
            </StackLayout>

          </FlexboxLayout>

          <StackLayout>
            <Pager height="30%" @loaded="loadedPager" transformers="null"
                   @selectedIndexChange="onChangeSelected">
              <PagerItem class="p-9 ">
                <StackLayout class="">
                  <FlexboxLayout class="w-[100%] h-[100%] rounded-3xl">
                    <Image
                        class="rounded-3xl"
                        src="~/assets/card-1.png"/>
                  </FlexboxLayout>
                </StackLayout>
              </PagerItem>
              <PagerItem class="p-9">
                <StackLayout class="">
                  <FlexboxLayout class="w-[100%] h-[100%] rounded-3xl">
                    <Image
                        class="rounded-3xl"
                        src="https://ck-content.imgix.net/pcm/content/2afbbf58d0c8fc30071c-Upgrade_digital_card_contactless_CK_CashRewards_final.png?auto=compress&mask=corners&corner-radius=10"/>
                  </FlexboxLayout>
                </StackLayout>
              </PagerItem>
              <PagerItem class="p-9">
                <StackLayout class="">
                  <FlexboxLayout class="w-[100%] h-[100%] rounded-3xl">
                    <Image src="https://bnext.es/img/template/card-pink.png?v=2"/>
                  </FlexboxLayout>
                </StackLayout>
              </PagerItem>
              <PagerItem class="p-9">
                <StackLayout class="">
                  <FlexboxLayout class="w-[100%] h-[100%] rounded-3xl">
                    <Image
                        src="https://www.caixabank.es/deployedfiles/particulares/Estaticos/Imagenes/Tarjetas/new_Tarjeta_MyCard.png"/>
                  </FlexboxLayout>
                </StackLayout>
              </PagerItem>
            </Pager>
          </StackLayout>
          <StackLayout ref="refContentView">
            <StackLayout class="flex-col px-3 ">
              <StackLayout class="bg-[#1F2630] rounded-2xl p-3">
                <FlexboxLayout class="justify-between items-center">
                  <FlexboxLayout class="items-end">
                    <Label :text="currentAccount.amount.toString().split('.')[0]" class="text-4xl"/>
                    <Label :text="`.${currentAccount.amount.toString().split('.')[1]}€`" class="text-xl pb-1"/>
                  </FlexboxLayout>
                  <Image :src="`~/assets/${currentAccount.region}.png`" stretch="fill"
                         class="h-[40] w-[40] rounded-full"></Image>
                </FlexboxLayout>

                <FlexboxLayout class="mt-4">
                  <FlexboxLayout class="items-center justify-center rounded-lg px-1 bg-[#F0B90B3F] ">
                    <Label text="Add money" class="text-[#F0B90B]"></Label>
                    <Label text="add" class="m-icon-round text-xs text-[#F0B90B]" fontSize="22"></Label>
                  </FlexboxLayout>
                  <FlexboxLayout class="items-center justify-center rounded-lg px-1 bg-[#F0B90B3F] ml-2">
                    <Label text="Send" class="text-[#F0B90B]"></Label>
                    <Label text="arrow_right" class="m-icon-round text-xs text-[#F0B90B]"></Label>
                  </FlexboxLayout>
                </FlexboxLayout>
                <FlexboxLayout class="justify-between mt-6">
                  <Label text="Transactions" class=""></Label>
                  <Label text="View all" class="text-[#F0B90B]"></Label>
                </FlexboxLayout>
                <ItemList :icon="lastTransaction.icon"
                          :title="lastTransaction.name"
                          :description="`${lastTransaction.hour} ${lastTransaction.date}`"
                          :right-text="`-${lastTransaction.amount}€`"
                          class="justify-between mt-3"></ItemList>

              </StackLayout>
            </StackLayout>
            <StackLayout class="px-3 mt-8">
              <Label text="Inversions" class="text-lg"></Label>
              <ScrollView orientation="horizontal" class="mt-2" scrollBarIndicatorVisible="false">
                <FlexboxLayout class="">
                  <StackLayout v-for="(item, i) in inversions" :key="i" class="flex-col mx-2">
                    <Image :src="item.icon" stretch="fill" class="h-[50] w-[50] rounded-full"></Image>
                    <Label :text="item.name" class="mt-2 text-center"></Label>
                  </StackLayout>
                </FlexboxLayout>
              </ScrollView>
            </StackLayout>
            <FlexboxLayout class="justify-between px-3 mt-8">
              <Label text="Scheduled Payments" class=""></Label>
              <Label text="View all" class="text-[#F0B90B]"></Label>
            </FlexboxLayout>
            <StackLayout class="flex-col px-3 mt-2">
              <StackLayout class="bg-[#1F2630] rounded-2xl p-3 py-4">
                <ItemList v-for="(payment, i) in currentAccount.scheduledPayments"
                          :key="i"
                          :icon="payment.icon"
                          :title="payment.name"
                          :description="payment.description"
                          :right-text="`-${payment.amount}€`"
                          class="justify-between"
                          :class="[i === 0 ? '': 'mt-4']"></ItemList>
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </Page>
  </Frame>
</template>
