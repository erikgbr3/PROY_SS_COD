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
        const { id } = req.query;

        if (id) {
            const player = await db.Player.findByPk(id);
            if (!player) {
                return res.status(404).json({ error: true, message: 'No se encontró el jugador' });
            }
            return res.json(player);
        } else {
            const player = await db.Player.findAll();
            return res.json(player);
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
            await db.player.update({...updates}, {
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

        await player.destroy();

        res.json({
            message: 'El jugador fue eliminado'
        })

    } catch(error){
        console.log('Error in delete player', error);
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