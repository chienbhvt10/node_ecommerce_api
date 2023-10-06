const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keytoken.service");
const { RoleShop } = require("../constants");
const { createTokenPair } = require("../utils/auth");
const { getIntoData } = require("./../utils/lodash");

class AuthService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check user exist
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: "xxx",
          message: "Shop already exists",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "public key string error",
          };
        }

        // Get the public key object from public key string
        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        // create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKeyObject,
          privateKey
        );

        return {
          code: "xxx",
          metadata: {
            shop: getIntoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AuthService;
