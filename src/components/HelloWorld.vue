<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../services/api';

defineProps<{ msg: string }>()

const cards = ref([])
const fetchCards = async (card?:string) => {
  await api.get(`?fname=${card || ""}&num=30&offset=0`).then((i) => {
    cards.value = i.data.data;
  })
}
const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  fetchCards(target.value);
}
const handleClick = (event: Event) => {
  
}
fetchCards("");

//Modal
interface Card {
  name:string
  type:string
  desc:string
  atk:number
  def:number
  race:string
  attribrute:string
  card_images:{image_url:string}[]
}

const selectedCard = ref<Card | undefined>(undefined);
import { Modal } from 'bootstrap';
const myModal = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

const showModal = (card:Card) => {
  selectedCard.value = card;
  if (myModal.value) {
    modalInstance = new Modal(myModal.value);
    modalInstance.show();
  }
};

const hideModal = () => {
  if (modalInstance) {
    modalInstance.hide();
  }
};
</script>

<template>
<h2 class="mb-4">Yu-Gi-Oh! Database</h2>
<div class="form-group">
  <input class="form-control" type="text" @input="onInputChange" ref="inputRef" placeholder="Pesquisar" />
</div>
<div class="container" style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div v-for="(card, i) in cards" :key="i">
    <img data-toggle="modal" data-target=".bd-example-modal-lg" @click="showModal(card as Card)" class="m-3" style="width: 200px; cursor: pointer;" :src="card.card_images[0].image_url" alt="">
  </div>
</div>

<p class="read-the-docs">:)</p>

<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div style="background-color: #222; border-radius: 6px;" class="d-flex align-items-center justify-content-start p-3">
      <div>
        <img style="width: 300px;" :src="selectedCard?.card_images[0].image_url" alt="">
      </div>
      <div class="ps-3">
        <h2>{{ selectedCard?.name }}</h2>
        <p>{{ selectedCard?.type.toLowerCase().includes("monster") ? `[${selectedCard.race}/${selectedCard.type.split(" ")[0]}]` : "" }}<br />
          {{ selectedCard?.attribrute }}</p>
        <p>{{ selectedCard?.desc }}</p>
        <p>{{ selectedCard?.type.toLowerCase().includes("monster") ? `ATK ${selectedCard.atk} / DEF ${selectedCard.def}` : "" }}</p>
      </div>
    </div>
  </div>
</div>

</template>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
