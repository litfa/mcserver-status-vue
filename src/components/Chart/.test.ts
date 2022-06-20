/**
 * {
    'id': 2,
    'date': '03:32',
    'status': 1,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 1
  },
 */
// import dayjs from 'dayjs'
const obj: data[] = [
  {
    'id': 2,
    'date': '03:32',
    'status': 1,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 1
  },
  {
    'id': 2,
    'date': '13:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 1
  },
  {
    'id': 2,
    'date': '23:32',
    'status': 1,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 2
  },
  {
    'id': 2,
    'date': '33:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 3
  },
  {
    'id': 2,
    'date': '43:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 3
  },
  {
    'id': 2,
    'date': '53:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 2
  },
  {
    'id': 2,
    'date': '03:32',
    'status': 1,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 2
  },
  {
    'id': 2,
    'date': '13:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 5
  },
  {
    'id': 2,
    'date': '23:32',
    'status': 0,
    'motd': '生存服-庄主基岩版公益服\nBedrock level',
    'max': 20,
    'online': 5
  }
]

interface data {
  id: number
  date: string
  status: number
  motd: string
  max: number
  online: number
}

// const errdata = obj.filter((e: data) => {
//   return !e.status
// })
// console.log(errdata)
const errIndex: [string, string | undefined][] = []

// obj.forEach((e) => {
//   console.log(e)
//   if (!e.status) {
//     errIndex.push([e.date, e.motd])
//   }
// })

// for (const i in obj) {
//   if (!obj[i].status) {
//     errIndex.push([
//       obj[i].date,
//       obj[Number(i) + 1]?.date || obj[Number(i) - 1]?.date
//     ])
//   }
// }
for (const i in obj) {
  if (!obj[i].status) {
    if (errIndex.at(-1) && errIndex.at(-1)?.at(1) == obj[i].date) {
      // 修改上一个
      errIndex[errIndex.length - 1][1] = obj[Number(i) + 1]?.date
    } else {
      errIndex.push([
        obj[i].date,
        obj[Number(i) + 1]?.date
        // 最后一项 没有下一项 为 undefined
        // || obj[Number(i) - 1]?.date
      ])
    }
  }
}

console.log(errIndex)