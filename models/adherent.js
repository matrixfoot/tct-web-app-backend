const mongoose = require('mongoose');

const adherentSchema = mongoose.Schema({
  Nomprenom: { type: String, required: true },
  categorie: { type: String, required: true },
  organisme: { type: String, required: true },
  datenaissance: { type: String, required: true },
  profession: { type: String, required: true },
  ficheUrl: { type: String, required: false },
  
  nationalité: { type: String, required: true },
  adresse: { type: String, required: true },
  codepostal: { type: String, required: true },
  ville: { type: String, required: true },
  portable1: { type: String, required: true },
  email: { type: String, required: true },
  contacturgence: { type: String, required: true },
  portablecontact: { type: String, required: true },
  dateinscription: { type: String, required: true },
  certificatmedical: { type: String, required: true },
  typeabonnement: { type: String, required: true },
  typeactivité: { type: String, required: true },
  option: { type: String, required: true },
});

module.exports = mongoose.model('Adherent', adherentSchema);
