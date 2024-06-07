const Calendar = require("../models");

class Calendars {

    async createCalendar(date, title, description, clubId) {
        try {
            const event = await Calendar.create({
                date: date,
                title: title,
                description: description,
                club_id: clubId
            });
            return event;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    async findCalendar(clubId) {
        try {
            const events = await Calendar.findAll({
                where: { club_id: clubId }
            });
            return events;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    async deleteCalendar(calendarId) {
        try {
            const calendar = await Calendar.findByPk(calendarId);

            if (!calendar) return null;

            await calendar.destroy();
            return calendar;
        } catch (err) {
            console.log(err);
            return null;
        }
    };
};
module.exports = Calendars;
