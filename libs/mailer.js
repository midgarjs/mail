class Mailer {
  constructor(config) {
    this.config = config
    this._mailersDef = {}
    this.mailers = {}
    this.currentMailer = null
  }

  addMailer(code, initCallback) {
    this._mailersDef[code] = initCallback
    if (this.currentMailer === null) {
      this.currentMailer = code
    }
  }

  setMailer(code) {
    this.currentMailer = code
  }

  async getMailer() {
    if (this.mailers[this.currentMailer] == undefined) {
      if (this._mailersDef[this.currentMailer] != undefined) {
        let mailer = this._mailersDef[this.currentMailer]()
        mailer.init(this.config)
        this.mailers[this.currentMailer] = mailer
        return mailer
      } else {
        throw new Error('Invalid mailer ' + this.currentMailer)
      }
    } else {
      return this.mailers[this.currentMailer]
    }
  }

  sendMail(options) {
    return this.getMailer().then(mailer => {
      return mailer.sendMail(options)
    })
  }
}

module.exports = Mailer
