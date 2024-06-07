const Calendar = require("../models");

class Calendars {

    async createEvent(date, eventName, eventDescription, createdBy, clubId) {
        try {
            const event = await Calendar.create({
                date: date,
                event_name: eventName,
                event_description: eventDescription,
                created_by: createdBy,
                club_id: clubId
            });
            return event;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
};
module.exports = Calendars;
