function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}

// true values are peaks
function query_func(results, Start, End) {
    for (let i = 0; i < results.length; i++) {
        if (parseInt(results[i].time_start) >= Start && parseInt(results[i].time_start) <= End) {
            return true;
        }
        else if (parseInt(results[i].time_start) <= Start && parseInt(results[i].time_end) >= End) {
            return true;
        }
        else if (parseInt(results[i].time_start) >= Start && parseInt(results[i].time_end) <= End) {
            return true;
        }
        else if (parseInt(results[i].time_end) >= Start && parseInt(results[i].time_end) <= End) {
            return true;
        }
    }

    return false;
}


function split_time(time_span, results, startTime) {
    let new_dict = [];
    let segments = parseInt(24 * 60 * 60 / time_span);

    for (let i = 0; i < segments; i++) {
        let next_segment1 = (i * time_span) + startTime;
        let next_segment2 = ((i + 1) * time_span) + startTime;

        // query
        if (query_func(results, next_segment1, next_segment2)) {
            new_dict.push({
                Value: 1,
                time: timeConverter(next_segment1)
            });
        }

        else {
            new_dict.push({
                Value: 0,
                time: timeConverter(next_segment1)
            });
        }
    }

    return new_dict;
}

export default split_time;
