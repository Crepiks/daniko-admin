<template>
  <daniko-right-block
    :isOpen="isPhotosBlockOpen"
    title="Редактирование галереи"
    :isLoading="isDataLoading"
    @close-right-block="$emit('close')"
  >
    <div class="right-block-component" ref="content">
      <daniko-multiple-file-input
        :filesPreviews="photos"
        :uploadLoading="fileUploadLoading"
        :deletingFileIds="deletingFileIds"
        @upload-file="repeatUploadFileEmit"
        @delete-file="repeatDeleteFileEmit"
      />
    </div>
  </daniko-right-block>
</template>

<script>
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import danikoMultipleFileInput from "@/components/common/daniko-multiple-file-input.vue";

export default {
  props: {
    isPhotosBlockOpen: {
      type: Boolean,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    isDataLoading: {
      type: Boolean,
      default: false,
    },
    fileUploadLoading: {
      type: Boolean,
      default: false,
    },
    deletingFileIds: {
      type: Array,
    },
  },

  components: {
    "daniko-right-block": danikoRightBlock,
    "daniko-multiple-file-input": danikoMultipleFileInput,
  },

  data: () => ({
    isNotificationOpen: false,
    notificationHeading: "",
    notificationText: "",
    notificationStatus: "error",
  }),

  watch: {
    isPhotosBlockOpen() {
      if (this.isPhotosBlockOpen) {
        this.$refs.content.scrollTo(0, 0);
      }
    },
  },

  methods: {
    repeatUploadFileEmit(file) {
      this.$emit("upload-file", file);
    },

    repeatDeleteFileEmit(fileId) {
      this.$emit("delete-file", fileId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.right-block {
  &-component {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
