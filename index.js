const utils = require('@midgar/utils')
const Plugin = require('@midgar/midgar/plugin')
const Mailer = require('./libs/mailer')
const Nodemailer = require('./libs/nodemailer')


class MidgarMail extends Plugin {

  async init() {
    //bind initHttpServer event
    this.pm.on('initHttpServer', () => {
      return this.initHttpServer()
    })
  }

  async initHttpServer () {
    if (this.midgar.config.mailer == undefined) {
      this.midgar.warn('No mailer config found !');
    }
    this.config = utils.assignRecursive({}, this.midgar.config.mailer || {})
    this.mailer = new Mailer(this.config)
    this.midgar.services.mailer = this.mailer

    this.mailer.addMailer('nodemailer', () => {
      return new Nodemailer()
    })

    this.mailer.setMailer('nodemailer')
  }
}

module.exports = MidgarMail

