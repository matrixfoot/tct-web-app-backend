const mongoose = require('mongoose');

const adherentSchema = mongoose.Schema({
  numadhesion: { type: String, required: true },
  nomprenom: { type: String, required: true },
  categorie: { type: String, required: true },
  organisme: { type: String, required: true },
  birthday: { type: String, required: true },
  ficheUrl: { type: String, required: false },
  profession: { type: String, required: true },
  NATIONALITE: { type: String, required: true },
  ADRESSE: { type: String, required: true },
  CP: { type: String, required: true },
  VILLE: { type: String, required: true },
  PORTABLE: { type: String, required: true },
  EMAIL: { type: String, required: true },
  PERSONNEACONTACTERENCASDURGENCE: { type: String, required: true },
  PORTABLE2: { type: String, required: true },
  DATEDINSCRIPTION: { type: String, required: true },
  CERTIFICATMEDICAL: { type: String, required: true },
  TYPEABONNEMENT: { type: String, required: true },
  TYPEACTIVITE: { type: String, required: true },
  ACTIVITEENSUS: { type: String, required: true },
  
});

module.exports = mongoose.model('Adherent', adherentSchema);





















