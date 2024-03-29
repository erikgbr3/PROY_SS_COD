import goalscore from "@/database/models/goalscore";
import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getGoalScore (req, res);

        case 'POST':
            return addGoalScore (req, res);

        case 'PUT':
            return updateGoalScore (req, res);

        case 'DELETE':
            return deleteGoalScore (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getGoalScore = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            const goalScore = await db.GoalScore.findByPk(id);
            if (!goalScore) {
                return res.status(404).json({ error: true, message: 'No se encontró la puntuación' });
            }
            return res.json(goalScore);
        } else {
            const goalScore = await db.GoalScore.findAll();
            return res.json(goalScore);
        }
    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

const addGoalScore = async (req, res) => {
    try {
        console.log(req.body);
        
        const goalScore = await db.GoalScore.create({...req.body});
        res.json({
            goalScore,
            message: 'El marcador fue registrado correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const updateGoalScore = async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        if (!id || Object.keys(updates).length === 0) {
        res.status(400).json({
            error: 'Faltan datos para actualizar o el ID es incorrecto'
        });
        } else {
        const goalScore = await db.GoalScore.findOne({ where: { id } });

        if (!goalScore) {
            res.status(400).json({
            error: true,
            message: 'ID de la puntuación incorrecto'
            });
        } else { 
            await db.GoalScore.update({...updates}, {
            where: {
                id: id
            }
            });
            res.json({
            message: 'El marcador fue actualizado'
            });
        }
        }

    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

  const deleteGoalScore = async (req, res) => {
    console.log('Delete goal scorer method called');
    try {
        const { id } = req.query;

      const goalScore = await db.GoalScore.findOne({ where: { id: id } });

      if (!goalScore) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el marcador',
        });
      }

        await goalScore.destroy();

        res.json({
            message: 'El marcador fue eliminado'
        })

    } catch(error){
        console.log('Error in delete goal scorer', error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }