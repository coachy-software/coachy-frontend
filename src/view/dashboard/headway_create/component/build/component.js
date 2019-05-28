import ObjectID from "bson-objectid";

export default {
  data: () => ({
    measurements: [
      {id: ObjectID.generate(), name: 'neck', value: 0},
      {id: ObjectID.generate(), name: 'arm', value: 0},
      {id: ObjectID.generate(), name: 'forearm', value: 0},
      {id: ObjectID.generate(), name: 'wrist', value: 0},
      {id: ObjectID.generate(), name: 'chest', value: 0},
      {id: ObjectID.generate(), name: 'waist', value: 0},
      {id: ObjectID.generate(), name: 'thigh', value: 0},
      {id: ObjectID.generate(), name: 'calf', value: 0},
      {id: ObjectID.generate(), name: 'weight', value: 0}
    ],
    imagesPreviews: [],
    images: []
  }),
  methods: {
    imageClickHandler(index) {
      document.getElementById('image' + index).toggleAttribute('checked');
      this.images[index].active = !this.images[index].active;
    },
    handleFileChange() {
      this.images = Array.from(this.$refs.images.files);

      for (let i = 0; i < this.images.length; i++) {
        this.getBase64(this.images[i]);
        this.images[i] = {file: this.images[i], active: true};
      }
    },
    getBase64(file) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => this.imagesPreviews.push({file: reader.result, active: true});
    }
  }
}
