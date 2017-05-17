const
  mongoose = require('mongoose'),
  locationSchema = new mongoose.Schema({
    svgPath: { type: String, default: 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z'},
    zoomLevel: { type: Number, default: '5' },
    scale: { type: Number, default: '0.5' },
    title: String,
    latitude: Number,
    longitude: Number
    // url: String,
  }, { toJSON: {virtuals: true} })

  locationSchema.virtual('url').get(function() {
    return '/locations/' + this.id
  })

module.exports = mongoose.model('Location', locationSchema)
