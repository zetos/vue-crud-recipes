<template>
  <div v-if="recipe" class="container edit-recipe">
    <h2>Edit {{ recipe.title }} Recipe</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="recipe.ingredients[index]"
        />
        <i @click="deleteIngredient(ingredient)" class="material-icons delete"
          >delete</i
        >
      </div>
      <div class="field edit-ingredient">
        <label for="edit-ingredient">Recipe Ingredients:</label>
        <input
          type="text"
          name="edit-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editRecipe() {
      console.log('recipe:', this.recipe);
    },
    addIngredient() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    },
    deleteIngredient(item) {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        ingredient => item !== ingredient
      );
    }
  },
  created() {
    // this is just to test the ".where" it should be .doc(id) on a real implementation.
    const ref = db
      .collection('recipes')
      .where('slug', '==', this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        this.recipe = { ...doc.data(), id: doc.id };
      });
    });
  }
};
</script>

<style>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}

.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
