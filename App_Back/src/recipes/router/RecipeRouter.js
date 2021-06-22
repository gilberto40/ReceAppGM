import express from 'express'
import CUFactory from '../business/factory/CUFactory.js'

class RecipeRouter {

    constructor(){
        this.factory = new CUFactory()
    }

    createRecipeRouter(){
        const recipeRouter = express.Router()
        const cuUploadRecipe = this.factory.createCase_UploadRecipe()
        const cuGetRecipes = this.factory.createCase_GetRecipes()
        const cuGetBuyList = this.factory.createCase_GetBuyList()
        const cuGetPdfOrEmailRecipe = this.factory.createCase_GetPdfOrEmailRecipe()
        const cuGetWeekPlan = this.factory.createCase_GetWeekPlan()

        recipeRouter.get('/recipes', async (req, res, next) => {
            try {
                const recipes = await (await cuGetRecipes).getRecipes()
                res.json(recipes)
            } catch(error) {
                next(error)
            }            
        });

        recipeRouter.post('/recipes/upload', async (req, res, next) => {
            try {
                (await cuUploadRecipe).upload(req)
                res.status(201).send({msg: 'Recipe Uploaded!'})
            } catch(error) {
                next(error)
            }            
        });     

        recipeRouter.post('/recipes/buylist', async(req, res, next) => {
            try {
                await (await cuGetBuyList).getMissingIngredients(req.query.idRecipe, req.query.idUser)
                res.status(200).send({msg: 'BuyList Sent!'})
            } catch(error) {
                next(error)
            }            
        })

        recipeRouter.post('/recipes/start', async (req, res, next) => {
            try {
                await (await cuGetPdfOrEmailRecipe).selectPdfOrEmailRecipe(req.query.recipe, req.query.user, req.query.format)
                res.status(200).send({msg: 'Receta iniciada'})
            } catch(error) {
                next(error)
            }    
        })

        recipeRouter.post('/recipes/:idUser/weekPlan',async (req, res, next) =>{
            try {
                await (await cuGetWeekPlan).list({
                    idUser: req.params.idUser,
                    keyWord: req.query.keyWord,
                    maxIngredients: req.query.maxIngredients,
                    maxTime: req.query.maxTime,
                    difficulty: req.query.difficulty
                })
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }         
        })
    
        return recipeRouter
    }
}

export default RecipeRouter