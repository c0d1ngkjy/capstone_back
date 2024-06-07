const Calendars = require("../services/calendar.service.js");

module.exports.createCalendar = async(req, res, next) => {
    const { date, eventName, eventDescription, createdBy, clubId } = req.body;

    const calendars = new Calendars();
    const event = await calendars.createEvent(date, eventName, eventDescription, createdBy, clubId);

    if (event) res.status(200).json({ msg: "일정 추가", eventData: event });
    else return res.status(404).json({ msg: "일정 추가 오류" });
};

module.exports.findCalendar = async(req, res, next) => {
    
};

module.exports.updateCalendar = async(req, res, next) => {
    
};

module.exports.deleteCalendar = async(req, res, next) => {
    
};