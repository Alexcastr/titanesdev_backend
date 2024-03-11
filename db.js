import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
/**
 * 0 = disconnected
 * 1= connected
 * 2= connecting
 * 3= disconecting
 */

const mongoConnection = {
  isConnected: 0
};
export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('ya estabamos conectados');
    return;
  }
  // si hay una conections, quiero revisar que hay en esa conección
  if (mongoose.connections.length > 0) {
    // vamos a tomar la primera
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior');
      return;
    }
    await mongoose.disconnect();
  }
  await mongoose.connect(process.env.MONGO_URI || '');
  mongoConnection.isConnected = 1;
  console.log('Contectado a mongoDB');
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') {
    //si estoy en desarrollo no me desconecto
    return;
  }

  if (mongoConnection.isConnected === 0) {
    //si la conexion es igual a 0 me salgo
    return;
  }
  // en este espacio se hace todo, hacer lecturas, conexiones con mongoose...
  await mongoose.disconnect();

  mongoConnection.isConnected = 0;

  console.log('Desconectado de MongoDB');
};
