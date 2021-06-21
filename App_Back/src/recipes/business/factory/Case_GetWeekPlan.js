import filter from "../models/Filter.js"
import listRecipes from "../services/ListService.js"

class Case_GetWeekPlan {
    constructor(userService, recipeService, mailer){
        this.userService = userService
        this.recipeService = recipeService
        this.mailer = mailer
    }

    async list({idUser, keyWord, maxIngredients, maxTime, difficulty}) {
        const user = await this.userService.getById(idUser)
        const params = new filter(keyWord, maxIngredients, maxTime, difficulty)
        const recipes = await this.recipeService.getFiltered(params)
        const recipeList = await listRecipes(recipes)
        await this.mailer.send(user.email, recipeList)
    }
}

export default Case_GetWeekPlan