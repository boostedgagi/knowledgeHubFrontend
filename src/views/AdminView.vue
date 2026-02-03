<template>
  <div class="container py-5">

    <h2 class="mb-4 text-center">Admin Panel</h2>

    <div class="row g-4">

      <!-- Users -->
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Users</h5>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="user in users" :key="user.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ user.name }}
                <button class="btn btn-sm btn-outline-primary" @click="openEdit('user', user)">
                  Edit
                </button>
              </li>
            </ul>
            <button class="btn btn-primary w-100" @click="openAdd('user')">
              Add User
            </button>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Categories</h5>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="cat in categories" :key="cat.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ cat.title }}
                <button class="btn btn-sm btn-outline-primary" @click="openEdit('category', cat)">
                  Edit
                </button>
              </li>
            </ul>
            <button class="btn btn-primary w-100" @click="openAdd('category')">
              Add Category
            </button>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Tags</h5>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="tag in tags" :key="tag.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ tag.title }}
                <button class="btn btn-sm btn-outline-primary" @click="openEdit('tag', tag)">
                  Edit
                </button>
              </li>
            </ul>
            <button class="btn btn-primary w-100" @click="openAdd('tag')">
              Add Tag
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-backdrop">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">

          <h5 class="mb-3">{{ modalTitle }}</h5>

          <input
              type="text"
              class="form-control mb-3"
              v-model="modalInput"
              placeholder="Enter value"
          >

          <div class="text-end">
            <button class="btn btn-secondary me-2" @click="modalVisible = false">
              Cancel
            </button>
            <button class="btn btn-primary" @click="saveItem">
              Save
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminPanelView",
  data() {
    return {
      users: [
        {  }
      ],
      categories: [
        {}
      ],
      tags: [
        { }
      ],

      modalVisible: false,
      modalType: null,
      editingItem: null,
      modalInput: ""
    }
  },
  computed: {
    modalTitle() {
      if (!this.editingItem) return `Add ${this.modalType}`
      return `Edit ${this.modalType}`
    }
  },
  methods: {
    openEdit(type, item) {
      this.modalType = type
      this.editingItem = item
      this.modalInput = item.name || item.title
      this.modalVisible = true
    },

    openAdd(type) {
      this.modalType = type
      this.editingItem = null
      this.modalInput = ""
      this.modalVisible = true
    },

    saveItem() {
      if (!this.modalInput.trim()) return

      if (this.modalType === "user") {
        if (this.editingItem) {
          this.editingItem.name = this.modalInput
        } else {
          this.users.push({ id: Date.now(), name: this.modalInput })
        }
      }

      if (this.modalType === "category") {
        if (this.editingItem) {
          this.editingItem.title = this.modalInput
        } else {
          this.categories.push({ id: Date.now(), title: this.modalInput })
        }
      }

      if (this.modalType === "tag") {
        if (this.editingItem) {
          this.editingItem.title = this.modalInput
        } else {
          this.tags.push({ id: Date.now(), title: this.modalInput })
        }
      }

      console.log("Saved:", this.modalType, this.modalInput)

      this.modalVisible = false
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-dialog {
  max-width: 500px;
  width: 100%;
}

.modal-content {
  background: #fff;
  border-radius: 0.5rem;
}
</style>
