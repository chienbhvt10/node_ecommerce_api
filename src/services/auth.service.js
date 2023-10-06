const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keytoken.service");
const { RoleShop } = require("../constants");
const { createTokenPair } = require("../utils/auth");
const { getIntoData } = require("./../utils/lodash");
const {
  BadRequestError,
  UnAuthorizedError,
} = require("../utils/error.response");
const { findByEmail } = require("./shop.service");

class AuthService {
  static login = async ({ email, password, refreshToken = null }) => {
    // check email in database
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Shop not registered");
    }
    // check password
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) {
      throw new UnAuthorizedError("Authentication failed");
    }

    // create access token and refresh token and save
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // generate token
    const tokens = await createTokenPair(
      {
        userId: foundShop._id,
        email,
      },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    // get login data return
    return {
      data: {
        shop: getIntoData({
          fields: ["_id", "name", "email"],
          object: foundShop,
        }),
        tokens,
      },
    };
  };

  static signUp = async ({ name, email, password }) => {
    // step 1: check user exist
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Shop already exists");
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
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError("Public key string error");
      }

      // create token pair
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKey,
        privateKey
      );

      return {
        data: {
          shop: getIntoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
  };
}

module.exports = AuthService;
