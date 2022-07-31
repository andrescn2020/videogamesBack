const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (!/[\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\:"()']/.test(value)) {
            throw new Error("Name incorrect");
          } 
        },
        notNull: {
          msg: 'Please enter a name'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (typeof value !== "string") {
            throw new Error("Image error");
          } 
        },
      }
    },
    description: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value.length >= 10000) {
            throw new Error("Description too long (Max 10000 characters)");
          } else if ((!/[\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\:"()']/.test(value))) {
            throw new Error("Description incorrect");
          }
        },
        notNull: {
          msg: 'Please enter a description'
        }
      }
    },
    released: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (typeof value !== "string") {
            throw new Error("Date error");
          } 
        },
      }
      
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
      validate: {
        customValidator(value) {
          if (typeof value !== "number") {
            throw new Error("Rating error");
          } 
        },
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a platform'
        }
      }
    }
  },
    {
      timestamps: false
    });
};
