const Calendars = require("../services/calendar.service.js");

module.exports.createCalendar = async(req, res, next) => {
    const { date, title, description, clubId } = req.body;

    const calendar = new Calendars();
    const calendars = await calendars.createCalendar(date, title, description, clubId);

    if (calendars) res.status(200).json({ msg: "일정 추가", calendarData: calendars });
    else return res.status(404).json({ msg: "일정 추가 오류" });
};

module.exports.findCalendar = async(req, res, next) => {
    const { clubId } = req.body;

    const calendar = new Calendars();
    const calendars = await calendar.findCalendar(clubId);

    if (calendars) res.status(200).json({ msg: "일정 조회", calendarData: calendars });
    else return res.status(404).json({ msg: "일정 조회 오류" });
};

module.exports.updateCalendar = async(req, res, next) => {
    
};

module.exports.deleteCalendar = async(req, res, next) => {
    const { calendarId } = req.body;

    const calendar = new Calendars();
    const calendars = await calendar.deleteCalendar(calendarId);

    if (calendars) res.status(200).json({ msg: "일정 삭제", calendarData: calendars });
    else return res.status(404).json({ msg: "일정 삭제 오류" });
};