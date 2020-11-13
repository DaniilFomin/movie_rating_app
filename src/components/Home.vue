<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in this.movies" :key="movie._id">
      <v-card-title primary-title>
        <div>
          <div class="headline">
            <v-btn class="headline" text v-bind:to="`/movies/${movie._id}`">
              {{ movie.name }}
            </v-btn>
          </div>
          <span class="grey--text">{{ movie.release_year + ' ' + movie.genre }}</span>
        </div>
      </v-card-title>
      <v-card-text>{{ movie.description }}</v-card-text>
      <v-card-actions>
        <v-btn text color="purple">Rate this movie</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script type="text/javascript">
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/movies',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.movies = response.data.movies;
          this.curent_user = response.data.curent_user;
        })
        .catch((error) => {
          this.$swal('movies not fetched', error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
