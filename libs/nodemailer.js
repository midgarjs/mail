const nodemailer = require('nodemailer')

class Nodemailer {
  async init(config) {
    this.config = config

    if (this.config.nodemailer == undefined) {
      throw new Error('Nodemailer config not found')
    }
    this.mailer = nodemailer.createTransport(this.config.nodemailer)
  }

  async sendMail(options) {
    return new Promise((resolve, reject) => {
      this.mailer.sendMail(options, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      });
    }).then(info => {
      return info
    })

  }
}

module.exports = Nodemailer
