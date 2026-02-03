<template>
  <div class="container py-5">

    <div class="row">
      <div class="col-md-8 offset-md-2">

        <div class="card shadow-sm mb-4">
          <div class="card-body text-center">
            <h3 class="card-title">{{ }} {{ }}</h3>
            <p class="text-muted">{{ }}</p>
            <p class="mb-0"><strong>Reputation:</strong> {{ n }}</p>
            <p class="mb-0">Member from: {{ }}</p>
            <button class="btn btn-outline-primary" @click="modalVisible = true">Edit Profile</button>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title mb-3">Your Activity</h5>

            <!-- Questions -->
            <div class="mb-3">
              <h6>Questions</h6>
              <ul class="list-group list-group-flush">
                <li v-for="c in comments" :key="c.id" class="list-group-item">
                  {{ }} <span class="text-muted small">({{}})</span>
                </li>
                <li v-if="comments" class="list-group-item text-muted">
                  No questions posted yet.
                </li>
              </ul>
            </div>

            <!-- Answers -->
            <!--
            <div class="mb-3">
              <h6>Comments</h6>
              <ul class="list-group list-group-flush">
                <li v-for="c in comments" :key="c.id" class="list-group-item">
                  {{  }} <span class="text-muted small">({{  }})</span>
                </li>
                <li v-if="comments.length === 0" class="list-group-item text-muted">
                  No comments posted yet.
                </li>
              </ul>
            </div>
-->
          </div>
        </div>

      </div>
    </div>

  </div>
  <div
      v-if="modalVisible"
      class="modal-backdrop"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <h5 class="mb-3">Edit Profile</h5>
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="editUser.firstName">
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="editUser.lastName">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="editUser.email">
        </div>
        <div class="text-end">
          <button class="btn btn-secondary me-2" @click="modalVisible = false">Cancel</button>
          <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      comments: [],
      editUser: {},
      modalVisible: false
    }
  },
  methods: {
    saveChanges() {
      this.user = {...this.editUser};
      this.modalVisible = false;

      console.log("Updated user:", this.user);
    }
  },
  watch: {
    modalVisible(newVal) {
      if (newVal) this.editUser = {...this.user};
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

/* Simple inline modal styling */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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