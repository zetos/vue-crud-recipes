<template>
  <div class="home container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)"
          >delete</i
        >
        <h2 class="indigo-text">
          {{ recipe.title }}
        </h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <span class="chip">
              {{ ingredient }}
            </span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{ name: 'editRecipe', params: { recipe_slug: recipe.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Home',
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    deleteRecipe(id) {
      //Delete recipe from firestore
      db.collection('recipes')
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter(recipe => {
            return recipe.id !== id;
          });
        });
    }
  },
  created() {
    // fetch data from firestore
    db.collection('recipes')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const id = doc.id;
          this.recipes.push({ ...doc.data(), id });
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.home h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.home .ingredients {
  margin: 30px auto;
}

.home .ingredients li {
  display: inline-block;
}

.home .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
