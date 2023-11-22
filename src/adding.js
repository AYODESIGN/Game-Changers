

const mongoose = require('mongoose');
const Card = require('../backend/models/card'); // Adjust the path as needed

mongoose.connect('mongodb+srv://ayoubcj:ayoub92@cluster0.wdlezms.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    await Card.updateMany({}, { $set: { collections: 'Realms of Heroes' } });
    console.log('Documents updated successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
})();