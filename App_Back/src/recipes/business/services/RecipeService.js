import Recipe from '../models/Recipe.js'
import StockItem from '../models/StockItem.js'
import Ingredient from '../models/Ingredient.js'

class RecipeService {

    constructor(recipeManager) {
        this.recipes = recipeManager
        this.addTestData()
    }

    async add(recipe) {
        await this.recipes.add(recipe)
    }

    async getAll() {
        return await this.recipes.getAll()
    }

    async getById(id) {
        return await this.recipes.getById(id)
    }

    async getFiltered(params) {
        return await this.recipes.getFiltered(params)
    }

    async addTestData() {
        const self = this

        const ingredient = new Ingredient({
            name: 'Huevo',
            unit: 'unidad'
        })

        const ingredient2 = new Ingredient({
            name: 'rodajas de merluza',
            unit: 'unidad'
        })

        const ingredient3 = new Ingredient({
            name: 'cebolla grande',
            unit: 'unidad'
        })

        const ingredient4 = new Ingredient({
            name: 'dientes de ajos',
            unit: 'unidad'
        })

        const ingredient5 = new Ingredient({
            name: 'puñado de perejil',
            unit: 'unidad'
        })

        const ingredient6 = new Ingredient({
            name: 'caldo de pescado',
            unit: 'unidad'
        })

        const ingredient7 = new Ingredient({
            name: 'vino blanco',
            unit: 'unidad'
        })

        const ingredient8 = new Ingredient({
            name: 'cucharada postre de harina de trigo o maicena',
            unit: 'unidad'
        })

        const stockItem = new StockItem({
            ingredient: ingredient,
            amount: 3
        })

        const stockItem2 = new StockItem({
            ingredient: ingredient2,
            amount: 8
        })

        const stockItem3 = new StockItem({
            ingredient: ingredient3,
            amount: 1
        })

        const stockItem4 = new StockItem({
            ingredient: ingredient4,
            amount: 2
        })

        const stockItem5 = new StockItem({
            ingredient: ingredient5,
            amount: 1
        })

        const stockItem6 = new StockItem({
            ingredient: ingredient6,
            amount: 1
        })

        const stockItem7 = new StockItem({
            ingredient: ingredient7,
            amount: 3
        })

        const stockItem8 = new StockItem({
            ingredient: ingredient8,
            amount: 4
        })

        self.add(new Recipe({
            title: '3 Huevos',
            image: '..\\uploads/huevos.jpg',
            plates: 3,
            time: 15,
            difficulty: 'Facil',
            characteristics: 'Simple, Economico, Vegetariano',
            stockIngredients: [
                {
                ingredient: stockItem.ingredient,
                amount: stockItem.amount
                }
            ]
        }))

        self.add(new Recipe({
            title: 'Merluza en salsa verde',
            image: '..\\uploads/huevos.jpg',
            plates: 3,
            time: 15,
            difficulty: 'Facil',
            characteristics: 'Simple, Economico',
            stockIngredients: [
                {
                    ingredient: stockItem2.ingredient,
                    amount: stockItem2.amount
                },
                {
                    ingredient: stockItem3.ingredient,
                    amount: stockItem3.amount
                },
                {
                    ingredient: stockItem4.ingredient,
                    amount: stockItem4.amount
                },
                {
                    ingredient: stockItem5.ingredient,
                    amount: stockItem5.amount
                },
                {
                    ingredient: stockItem6.ingredient,
                    amount: stockItem6.amount
                },
                {
                    ingredient: stockItem7.ingredient,
                    amount: stockItem7.amount
                },
                {
                    ingredient: stockItem8.ingredient,
                    amount: stockItem8.amount
                }
            ]
        }))
    }
}

export default RecipeService