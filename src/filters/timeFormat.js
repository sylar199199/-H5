import moment from 'moment'

export const timeFormat = (t, f = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(new Date(t)).format(f)
}

// function getDay(day) {
//   let name
//   switch (day) {
//     case 1: name = 'Monday'; break
//     case 2: name = 'Tuesday'; break
//     case 3: name = 'Wednesday'; break
//     case 4: name = 'Thursday'; break
//     case 5: name = 'Friday'; break
//     case 6: name = 'Saturday'; break
//     case 7: name = 'Sunday'; break
//   }
//   return name
// }
