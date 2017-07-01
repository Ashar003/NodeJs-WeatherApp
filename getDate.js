getDate = (timestamp) => {
     var pubDate = new Date();
        pubDate.setTime(timestamp * 1000); //expects milliseconds 
        var weekDay=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
        var monthName=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    return formattedDate = `${weekDay[pubDate.getDay()]} ${monthName[pubDate.getMonth()]} ${pubDate.getDate()}, ${pubDate.getFullYear()}`;
};

module.exports = {
    getDate
}