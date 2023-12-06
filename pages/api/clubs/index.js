import db from "database/models";
import { validateToken } from "../../../validateToken";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return validateToken(req, res, () =>getClub (req, res));

        case 'POST':
            return addClub (req, res);

        case 'PUT':
            return updateClub (req, res);

        case 'DELETE':
            return deleteClub (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getClub = async (req, res) => {
    try {
      let clubs = [];
  
      const { leagueId, userId } = req.query; // Extract leagueId and userId from query parameters
  
      if (userId) {
        // Fetch clubs owned by a specific user
        clubs = await db.Club.findAll({
          where: {
            ownerTeamId: userId,
          },
          include: ['owner', 'suscription'],
        });
      } else {
        // Check if leagueId is provided, fetch clubs subscribed to that league
        if (leagueId) {
          clubs = await db.Club.findAll({
            include: [
              {
                model: db.Suscription,
                as: 'suscription',
                where: { leagueId },
              },
              'owner',
            ],
          });
        } else {
          // Fetch all clubs if neither leagueId nor userId is provided
          clubs = await db.Club.findAll({
            include: ['owner', 'suscription'],
          });
        }
      }
  
      return res.json(clubs);
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
        message: `Ocurrio un error al procesar la petición: ${error.message}`,
        errors,
      });
    }
  };
  
  

const addClub = async (req, res) => {
    try {
        console.log(req.body);
        
        const club = await db.Club.create({...req.body});
        res.json({
            club,
            message: 'El club fue registrado correctamente'
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

const updateClub = async (req, res) => {
    try {
        let { id } = req.body;

        await db.Club.update({...req.body}, {
            where: {
                id : id
            },
        })
        res.json({
            message: 'El club fue actualizado'
        });

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

  const deleteClub = async (req, res) => {
    console.log('Delete club method called');
    try {
        const { id } = req.query;

      const club = await db.Club.findOne({ where: { id: id } });

      if (!club) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el club',
        });
      }

        await club.destroy();

        res.json({
            message: 'El club fue eliminado'
        })

    } catch(error){
        console.log('Error in delete league', error);
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