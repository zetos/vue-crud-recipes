<template>
  <div v-if="recipe" class="container edit-recipe">
    <h2>Edit {{ recipe.title }} Recipe</h2>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: null
    };
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

<style></style>
