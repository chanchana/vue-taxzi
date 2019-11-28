<template>
  <div v-if="infoData">
    <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        <h3>Hello From This Modal! {{infoData.destination}}</h3>
      </div>
      <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
    </b-modal>
    <button @click="showModal" class="rectangle">
      <img
        src="~/assets/create---option-icons8-forward-96-copy@2x.png"
        style="width: 40px; height: 40px; float:right;display: inline;"
      />
      <b style="font-size:18px;">{{infoData.start}} - {{infoData.destination}}</b>
      <br />
      <p style="font-size:12px;">{{infoData.members}} - {{infoData.date}} . {{infoData.time}}</p>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    infoData: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleModalKri() {
      this.isOpen = !this.isOpen;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
  }
};
</script>