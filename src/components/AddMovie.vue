<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :rules="nameRules" label="Movie Name" required></v-text-field>
    <v-text-field v-model="description" label="Movie Description" multi-line name="input-7-1">
    </v-text-field>
    <v-select
      v-model="release_year"
      :items="years"
      :rules="releaseRules"
      label="Movie Release Year"
      required
    >
    </v-select>
    <v-text-field v-model="genre" :rules="genreRules" label="Movie Genre" required></v-text-field>
    <v-btn :disabled="!valid" @click="submit"> submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    genre: '',
    release_year: '',
    nameRules: [(v) => !!v || 'Movie name is required'],
    genreRules: [
      (v) => !!v || 'Movie genre year is required',
      (v) => (v && v.length <= 80) || 'Genre must be less than equal to 80 characters',
    ],
    releaseRules: [(v) => !!v || 'Movie release year is required'],
    select: null,
    years: ['2020', '2019', '2018', '2017', '2016', '2015'],
    checkbox: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            description: this.description,
            release_year: this.release_year,
            genre: this.genre,
          },
          url: '/movies',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal('Great!', 'Movie added successfully!', 'success');
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal('Oh oo!', 'Could not add the movie!', 'error');
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped></style>
