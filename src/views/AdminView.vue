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
                {{ user.email }}
                <select class="form-select" v-model="user.roles"
                        aria-label="Default select example" @change="changeUserRole(user,user.roles)">
                  <option disabled value="0">Open this select menu</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Administrator">Administrator</option>
                </select>
                <button class="btn btn-sm btn-outline-primary" @click="onDeleteUser(user)">
                  Delete
                </button>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Categories</h5>
            <button class="btn btn-primary w-100 mb-2" @click="openAdd('category')">
              Add Category
            </button>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="category in categories" v-bind:key="category.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                #{{ category.id }} | {{ category.title }} | {{ formatDate(category.createdAt) }}
                <button class="btn btn-sm btn-outline-primary" @click="openEdit('category', category)">
                  Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="onDeleteCategory(category)">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title mb-3">Tags</h5>
            <button class="btn btn-primary w-100 mb-2" @click="openAdd('tag')">
              Add Tag
            </button>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="tag in tags" :key="tag.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                #{{ tag.id }} | {{ tag.title }} | {{ formatDate(tag.createdAt) }}
              <button class="btn btn-sm btn-outline-primary" @click="openEdit('tag', tag)">
                Edit
              </button>
                <button class="btn btn-sm btn-outline-danger" @click="onDeleteTag( tag)">
                Delete
              </button>
              </li>
            </ul>
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
import axios from "axios";

export default {
  name: "AdminPanelView",
  data() {
    return {
      users: [],
      categories: [],
      tags: [],
      modalVisible: false,
      modalType: null,
      editingItem: null,
      editingCategory: null,
      editingTag: null,
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
    async changeUserRole(user,newRole){
      /**
       * this doesnt work for some reason, also tried the put way but helplessly
       */

      try {
        const response = await axios.patch(`${this.api}/change_user_role/${user.id}`,
            {roles: newRole},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        if (response) {
          alert("Successfully edited user!");
          await this.getUsers();
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(value) {
      if (!value) return '';
      return new Date(value).toLocaleDateString('sr-RS');
    },
    async getUsers(){
      try {
        const response = await axios.get(`${this.api}/users`);
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`${this.api}/categories`);
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTags() {
      try {
        const response = await axios.get(`${this.api}/tags`);
        this.tags = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteUser(user){
      try {
        const response = await axios.delete(`${this.api}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response) {
          alert("Successfully deleted user!");
          await this.getUsers();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteCategory(category) {
      try {
        const response = await axios.delete(this.api + '/categories/' + category.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response) {
          alert("Successfully deleted category!");
          await this.getCategories();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onEditCategory(categoryId, newCategoryTitle) {
      try {
        const response = await axios.put(`${this.api}/categories/${categoryId}`,
            {title: newCategoryTitle},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        if (response) {
          alert("Successfully edited category!");
          await this.getCategories();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onAddCategory(newCategoryTitle) {
      try {
        const response = await axios.post(`${this.api}/categories`,
            {title: newCategoryTitle},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        if (response) {
          alert("Successfully added new category!");
          await this.getCategories();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteTag(tag) {
      try {
        const response = await axios.delete(this.api + '/tags/' + tag.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response) {
          alert("Successfully deleted tag!");
          await this.getTags();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onEditTag(tagId,newTagTitle) {
      try {
        const response = await axios.put(`${this.api}/tags/${tagId}`,
            {title: newTagTitle},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        if (response) {
          alert("Successfully edited tag!");
          await this.getCategories();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onAddTag(newTagTitle) {
      try {
        const response = await axios.post(`${this.api}/tags`,
            {title: newTagTitle},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        if (response) {
          alert("Successfully added new tag!");
          await this.getTags();
        }
      } catch (error) {
        console.log(error);
      }
    },
    openEdit(type, item) {
      this.modalType = type
      this.editingItem = item
      this.editingCategory = item
      this.editingTag = item
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
          this.users.push({id: Date.now(), name: this.modalInput})
        }
      }
      if (this.modalType === "category") {
        if (this.editingItem) {
          this.onEditCategory(this.editingCategory.id, this.modalInput);
        } else {
          this.onAddCategory(this.modalInput);
        }
      }
      if (this.modalType === "tag") {
        if (this.editingItem) {
          this.onEditTag(this.editingTag.id, this.modalInput);
        } else {
          this.onAddTag(this.modalInput);
        }
      }
      this.modalVisible = false
    }
  },
  mounted() {
    this.getCategories();
    this.getTags();
    this.getUsers();
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
  background: rgba(0, 0, 0, 0.5);
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
