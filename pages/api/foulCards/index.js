//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return foulCardsList(req, res);
    case 'POST':
      return addCard(req, res);
    case 'PUT':
      return updateCard(req, res);
    case 'DELETE': 
      return deleteCard(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const foulCardsList = async (req, res) => {
  try {
      const { id } = req.query;

      if (id) {
          const foulCard = await db.FoulCard.findByPk(id);
          if (!foulCard) {
              return res.status(404).json({ error: true, message: 'No se encontró la tarjeta' });
          }
          return res.json(foulCard);
      } else {
          const foulCard = await db.FoulCard.findAll();
          return res.json(foulCard);
      }
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}


//Agregar una tarjeta a un jugador
const addCard = async (req, res) => {
  try {
    //Datos del cuerpo
    console.log(req.body);
    //Agregar la tarjeta
    const foulCard = await db.FoulCard.create({...req.body});
    res.json({
      foulCard,
      message: "Jugador Amonestado"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

//Realizar cambios
const updateCard = async(req, res) => {
  try {
    const { id, ...updates } = req.body;

        if (!id || Object.keys(updates).length === 0) {
        res.status(400).json({
            error: 'Faltan datos para actualizar o el ID es incorrecto'
        });
        } else {
        const foulCard = await db.FoulCard.findOne({ where: { id } });

        if (!foulCard) {
            res.status(400).json({
            error: true,
            message: 'ID de la tarjeta incorrecto'
            });
        } else { 
            await db.FoulCard.update({...updates}, {
            where: {
                id: id
            }
            });
            res.json({
            message: 'Se realizaron Aujustes en la amonestación'
            });
        }
        }
  
  } catch (error) {
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

//eliminar amonestación
const deleteCard = async(req, res) =>{
  try {
    const { id } = req.query;

      const foulCard = await db.FoulCard.findOne({ where: { id: id } });

      if (!foulCard) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró la tarjeta',
        });
      }

        await foulCard.destroy();

        res.json({
            message: 'La tarjeta fue quitada'
        })
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}
