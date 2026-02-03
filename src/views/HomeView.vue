<template>
  <div class="container py-5">

    <!-- Search Section -->
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="input-group">
          <input
              type="text"
              class="form-control"
              placeholder="Pretraži..."
              v-model="searchQuery"
          >
          <button class="btn btn-primary" @click="search">
            Pretraži
          </button>
        </div>
      </div>
    </div>

    <!-- Cards List -->
    <div class="container border d-flex flex-column align-items-center">
      <div
          class="col-md-6 mb-6"
          v-for="card in filteredCards"
          :key="card.id"
      >
        <div class="card h-100 mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.description }}</p>
            <a href="#" class="btn btn-outline-primary">Detaljnije</a>
          </div>
        </div>

        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.description }}</p>
            <a href="#" class="btn btn-outline-primary">Detaljnije</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// @ is an alias to /src
//tu ide logika za ako nije logovan i slicno

export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: "",
      cards: [
        { id: 1, title: "Kartica 1", description: "Opis kartice 1" },
      ]
    }
  },
  computed: {
    filteredCards() {
      if (!this.searchQuery) return this.cards;
      return this.cards.filter(card =>
          card.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    search() {
      // ovde možeš dodati logiku za pretragu, trenutno radi reactive filtering
      console.log("Pretražujem: ", this.searchQuery);
    }
  }

}
</script>
<style scoped>
.card-img-top {
  height: 150px;
  object-fit: cover;
}
</style>

