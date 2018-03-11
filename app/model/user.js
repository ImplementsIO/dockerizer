'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    avatar: { type: String },
    username: { type: String },
    displayName: { type: String },
    githubId: {
      type: String,
      unique: true,
    },
    githubJson: {},
  });

  return mongoose.model('User', UserSchema);
};
