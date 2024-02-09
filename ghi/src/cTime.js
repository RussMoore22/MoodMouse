// function converting zulutime to timezone of user

const cTime = (dateObject, correctionMinutes) => {

    const convertedDate = new Date(dateObject.setHours(dateObject.getHours()-correctionMinutes/60))

    return convertedDate

}
