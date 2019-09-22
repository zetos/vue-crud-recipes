<template>
  <div class="container add-recipe">
    <h2 class="center-align indigo-text">Add new Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Recipe Ingredients:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';

export default {
  name: 'AddRecipe',
  data() {
    return {
      title: null,
      ingredients: [],
      another: null,
      feedback: null
    };
  },
  methods: {
    addRecipe() {
      if (this.title && this.ingredients.length) {
        this.feedback = null;
        const newRecipe = {
          title: this.title,
          ingredients: this.ingredients,
          slug: slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
        };

        db.collection('recipes')
          .add(newRecipe)
          .then(() => {
            this.$router.push({ name: 'home' });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.feedback = 'A recipe must have a title and ingredient(s)';
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    }
  }
};
</script>

<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-recipe .field {
  margin: 20px auto;
}
</style>
