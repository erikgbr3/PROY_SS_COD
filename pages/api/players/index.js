import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getPlayers (req, res);

        case 'POST':
            return addPlayer (req, res);

        case 'PUT':
            return updatePlayer (req, res);

        case 'DELETE':
            return deletePlayer (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getPlayers = async (req, res) => {
    try {
      const { id, clubId } = req.query;
  
      if (id) {
        const player = await db.Player.findByPk(id);
        if (!player) {
          return res.status(404).json({ error: true, message: 'No se encontró el jugador' });
        }
        return res.json(player);
      } else if (clubId) {
        const players = await db.Player.findAll({
          where: {
            clubId: clubId,
          },
        });
        return res.json(players);
      } else {
        const players = await db.Player.findAll();
        return res.json(players);
      }
    } catch (error) {
 
      console.log(error);
      let errors = [];
      if (error.errors) {
        errors = error.errors.map((item) => ({
          error: item.message,
          field: item.path,
        }));
      }
      return res.status(400).json({
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors,
      });
    }
  };
  

const addPlayer = async (req, res) => {
    try {
        console.log(req.body);
        
        const player = await db.Player.create({...req.body});
        res.json({
            player,
            message: 'El jugador fue registrado correctamente'
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

const updatePlayer = async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        if (!id || Object.keys(updates).length === 0) {
        res.status(400).json({
            error: 'Faltan datos para actualizar o el ID es incorrecto'
        });
        } else {
        const player = await db.Player.findOne({ where: { id } });

        if (!player) {
            res.status(400).json({
            error: true,
            message: 'ID de jugador incorrecto'
            });
        } else { 
            await db.Player.update({...updates}, {
            where: {
                id: id
            }
            });
            res.json({
            message: 'El jugador fue actualizado'
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

  const deletePlayer = async (req, res) => {
    console.log('Delete player method called');
    try {
      const { id } = req.query;
  
      const player = await db.Player.findOne({ where: { id: id } });
  
      if (!player) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el jugador',
        });
      }
  
      // Eliminar registros asociados en FoulCard
      await db.FoulCard.destroy({ 
        where: { playerId: id } 
    });
  
      // Eliminar registros asociados en GoalScore
      await db.GoalScore.destroy({ 
        where: { playerId: id } 
    });
  
      // Finalmente, eliminar el jugador
      await player.destroy();
  
      res.json({
        message: 'El jugador y sus registros asociados fueron eliminados',
      });
    } catch (error) {
      console.log('Error in delete player', error);
      let errors = [];
      if (error.errors) {
        errors = error.errors.map((item) => ({
          error: item.message,
          field: item.path,
        }));
      }
      return res.status(400).json({
        error: true,
        message: `Ocurrio un error al procesar la petición: ${error.message}`,
        errors,
      });
    }
  };
  