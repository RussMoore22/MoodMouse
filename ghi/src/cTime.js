// function converting zulutime to timezone of user

const cTime = (date) => {
    if (!(date)){
        return null
    }
    let dateObject = new Date(date)
    const correctionMinutes = (new Date(Date.now())).getTimezoneOffset()
    const convertedDate = new Date(dateObject.setHours(dateObject.getHours()-correctionMinutes/60))

    return convertedDate

}

export default cTime
