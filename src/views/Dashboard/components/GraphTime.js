function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function split_time(time_span, dict) {
    let new_dict = [];
    let time_delta = dict.time_end - dict.time_start;
    let segments = parseInt(time_delta / time_span);
    
    for (let i = 0; i < segments; i++) {
        let next_segment_scaled = time_delta / segments;
        let next_segment = (i + 1) * next_segment_scaled;
        new_dict.push({
            value: dict.is_running ? 1 : 0,
            time: timeConverter(dict.time_start + next_segment)
        });
    }

    return new_dict;
}

export default split_time;
