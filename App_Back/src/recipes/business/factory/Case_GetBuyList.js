class Case_GetBuyList {

    constructor(recipeService, userService, pdfMaker) {
        this.recipeService = recipeService
        this.pdfMaker = pdfMaker
        this.userService = userService
    }

    async getMissingIngredients(idRecipe, idUser) {
        var self = this
        const user = await this.userService.getById(idUser)
        const inventory = user.inventory
        const recipe = await this.recipeService.getById(idRecipe);
        const missingIngredients = self.getMissing(inventory, recipe);
        this.pdfMaker.generate(missingIngredients, 'buylist.pdf');
    }

    getMissing(inventory, recipe) {

        const missingIngredients = [];
    
        missingIngredients.push([recipe.title, "", ""]);
    
        missingIngredients.push([{ text: 'Ingredientes', bold: true }, { text: 'Cantidad', bold: true }, ""]);
    
        recipe.stockIngredients.forEach(stockIngredient => {
            //busca cada ingrediente de la recipe en el inventario del usuario
            const ingredientFound = inventory.find((stockItem) => stockItem.ingredient.name == stockIngredient.ingredient.name);
    
            if (ingredientFound) {
                const missingAmount = stockIngredient.amount - ingredientFound.amount
    
                if (missingAmount > 0) {
                    missingIngredients.push([stockIngredient.ingredient.name, missingAmount, stockIngredient.ingredient.unit]);
                }
            } else {
                missingIngredients.push([stockIngredient.ingredient.name, stockIngredient.amount , stockIngredient.ingredient.unit]);
            }
        });
    
        return missingIngredients;
    }
}

export default Case_GetBuyList