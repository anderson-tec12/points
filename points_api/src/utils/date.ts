class DateUtils {
  getMonthAndYear() {
    const dateNow = new Date()

    const month = dateNow.getMonth() + 1
    const year = dateNow.getFullYear()

    return `${month.toString().padStart(2, '0')}/${year.toString()}`
  }
}

export const dateUtils = new DateUtils()
